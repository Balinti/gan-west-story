import { useState, useMemo } from "react";
import { scenes, mainPathScenes } from "./data/story";
import StoryScreen from "./components/StoryScreen";

function App() {
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
  };

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
