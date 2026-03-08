import { useState, useMemo } from "react";
import { scenes, mainPathScenes } from "./data/story";
import StoryScreen from "./components/StoryScreen";

const base = import.meta.env.BASE_URL;

function App() {
  const [started, setStarted] = useState(false);
  const [currentSceneId, setCurrentSceneId] = useState("opening");
  const [history, setHistory] = useState<string[]>(["opening"]);

  const currentScene = scenes[currentSceneId];

  const progress = useMemo(() => {
    let maxIdx = 0;
    for (const visited of history) {
      const idx = mainPathScenes.indexOf(visited);
      if (idx > maxIdx) maxIdx = idx;
    }
    return maxIdx;
  }, [history]);

  const handleNext = (nextSceneId: string) => {
    setCurrentSceneId(nextSceneId);
    setHistory((prev) => [...prev, nextSceneId]);
  };

  const handleRestart = () => {
    setCurrentSceneId("opening");
    setHistory(["opening"]);
    setStarted(false);
  };

  if (!started) {
    return (
      <div className="app-container">
        <div className="story-screen start-screen">
          <img
            src={`${base}scenes/opening.png`}
            alt=""
            className="start-bg"
          />
          <div className="start-overlay">
            <h1 className="start-title">A Day at Gan West</h1>
            <p className="start-subtitle">An Interactive Story</p>
            <button
              className="start-button"
              onClick={() => setStarted(true)}
            >
              Start Story
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
        onNext={handleNext}
        progress={progress}
        totalScenes={mainPathScenes.length - 1}
        isEnd={currentScene.id === "end"}
        onRestart={handleRestart}
      />
    </div>
  );
}

export default App;
