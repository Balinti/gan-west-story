import { useState, useCallback } from "react";
import type { Scene, Choice } from "../data/story";
import SceneBackground from "./SceneBackground";
import NarrationText from "./NarrationText";
import ChoiceButtons from "./ChoiceButtons";
import ProgressBar from "./ProgressBar";

type Props = {
  scene: Scene;
  onNext: (nextSceneId: string) => void;
  progress: number;
  totalScenes: number;
  isEnd: boolean;
  onRestart: () => void;
};

export default function StoryScreen({
  scene,
  onNext,
  progress,
  totalScenes,
  isEnd,
  onRestart,
}: Props) {
  const [textComplete, setTextComplete] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleTextComplete = useCallback(() => {
    setTextComplete(true);
  }, []);

  const handleAdvance = () => {
    if (!textComplete) return;
    if (scene.next) {
      goToScene(scene.next);
    }
  };

  const handleChoice = (choice: Choice) => {
    goToScene(choice.nextScene);
  };

  const goToScene = (nextId: string) => {
    setTransitioning(true);
    setTimeout(() => {
      setTextComplete(false);
      setTransitioning(false);
      onNext(nextId);
    }, 400);
  };

  const hasChoices = scene.choices && scene.choices.length > 0;
  const showContinue = textComplete && !hasChoices && !isEnd && scene.next;

  return (
    <div className={`story-screen ${transitioning ? "fade-out" : "fade-in"}`}>
      <ProgressBar current={progress} total={totalScenes} />

      <div className="scene-content">
        <div className="scene-image-layer">
          <SceneBackground sceneId={scene.id} />
        </div>

        <div className="text-layer">
          <NarrationText
            text={scene.text}
            onComplete={handleTextComplete}
            key={scene.id}
          />

          {hasChoices && (
            <ChoiceButtons
              choices={scene.choices!}
              onChoose={handleChoice}
              visible={textComplete}
            />
          )}

          {showContinue && (
            <button className="continue-button" onClick={handleAdvance}>
              Continue...
            </button>
          )}

          {isEnd && textComplete && (
            <button className="restart-button" onClick={onRestart}>
              Read Again!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
