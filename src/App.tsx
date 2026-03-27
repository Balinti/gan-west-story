import { useState, useMemo } from "react";
import { stories, storiesById, hiddenStories } from "./data/stories";
import StoryScreen from "./components/StoryScreen";
import StorySelector from "./components/StorySelector";
import IntroVideo from "./components/IntroVideo";
import { trackStoryStarted, trackStoryCompleted, trackSceneView } from "./utils/analytics";

function App() {
  const [showIntro, setShowIntro] = useState(
    () => !sessionStorage.getItem("kidstory_intro_seen")
  );
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(() => {
    // Check pathname first (works on dev server), then ?p= param (GitHub Pages 404 redirect)
    let path = window.location.pathname.replace(/^\//, "");
    if (!path) {
      const params = new URLSearchParams(window.location.search);
      path = (params.get("p") || "").replace(/^\//, "");
    }
    const idx = parseInt(path, 10);
    if (!isNaN(idx) && idx >= 1 && idx <= hiddenStories.length) {
      return hiddenStories[idx - 1].id;
    }
    return null;
  });
  const [started, setStarted] = useState(false);
  const [currentSceneId, setCurrentSceneId] = useState(() => {
    if (selectedStoryId) {
      return storiesById[selectedStoryId].firstSceneId;
    }
    return "";
  });
  const [history, setHistory] = useState<string[]>(() => {
    if (selectedStoryId) {
      return [storiesById[selectedStoryId].firstSceneId];
    }
    return [];
  });

  const story = selectedStoryId ? storiesById[selectedStoryId] : null;
  const currentScene = story ? story.scenes[currentSceneId] : null;

  const progress = useMemo(() => {
    if (!story) return 0;
    let maxIdx = 0;
    for (const visited of history) {
      const idx = story.mainPathScenes.indexOf(visited);
      if (idx > maxIdx) maxIdx = idx;
    }
    return maxIdx;
  }, [history, story]);

  const handleSelectStory = (storyId: string) => {
    const s = storiesById[storyId];
    setSelectedStoryId(storyId);
    setCurrentSceneId(s.firstSceneId);
    setHistory([s.firstSceneId]);
    setStarted(false);
  };

  const handleNext = (nextSceneId: string) => {
    setCurrentSceneId(nextSceneId);
    setHistory((prev) => [...prev, nextSceneId]);
    if (story) {
      trackSceneView(story.id, nextSceneId);
      if (nextSceneId === story.endSceneId) trackStoryCompleted(story.id);
    }
  };

  const handleBack = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    setCurrentSceneId(newHistory[newHistory.length - 1]);
  };

  const canGoBack = started && history.length > 1;

  const handleRestart = () => {
    if (story) {
      setCurrentSceneId(story.firstSceneId);
      setHistory([story.firstSceneId]);
    }
    setStarted(false);
  };

  const handleHome = () => {
    setSelectedStoryId(null);
    setStarted(false);
    setHistory([]);
    window.history.replaceState(null, "", "/");
  };

  // Intro video (once per session)
  if (!story && showIntro) {
    return (
      <IntroVideo
        onComplete={() => {
          setShowIntro(false);
          sessionStorage.setItem("kidstory_intro_seen", "1");
        }}
      />
    );
  }

  // No story selected → show story selector
  if (!story) {
    return <StorySelector stories={stories} onSelect={handleSelectStory} />;
  }

  // Story selected but not started → show start screen
  if (!started) {
    return (
      <div className="app-container">
        <div className="story-screen start-screen">
          <img
            src={story.coverImage}
            alt=""
            className="start-bg"
          />
          <div className="start-overlay">
            <h1 className="start-title">{story.title}</h1>
            <p className="start-subtitle">{story.subtitle}</p>
            <button
              className="start-button"
              onClick={() => { setStarted(true); trackStoryStarted(story.id); trackSceneView(story.id, story.firstSceneId); }}
            >
              Start Story
            </button>
            <button className="home-link" onClick={handleHome}>
              Choose Another Story
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentScene) {
    return <div className="error">Scene not found: {currentSceneId}</div>;
  }

  return (
    <div className="app-container">
      <StoryScreen
        scene={currentScene}
        sceneId={currentSceneId}
        storyId={story.id}
        onNext={handleNext}
        onBack={handleBack}
        canGoBack={canGoBack}
        onHome={handleHome}
        progress={progress}
        totalScenes={story.mainPathScenes.length - 1}
        isEnd={currentSceneId === story.endSceneId}
        onRestart={handleRestart}
        landscape={story.landscape}
      />
    </div>
  );
}

export default App;
