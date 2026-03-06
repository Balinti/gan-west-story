import { useState, useEffect } from "react";
import type { Scene, Choice } from "../data/story";
import SceneBackground from "./SceneBackground";
import NarrationText from "./NarrationText";
import ChoiceButtons from "./ChoiceButtons";
import ProgressBar from "./ProgressBar";
import { useSceneAudio } from "../hooks/useSceneAudio";

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
  const [transitioning, setTransitioning] = useState(false);
  const { sentences, currentSentenceIndex, allDone, skipAll } = useSceneAudio(
    scene.id
  );

  // Reset transition state when scene changes
  useEffect(() => {
    setTransitioning(false);
  }, [scene.id]);

  const handleAdvance = () => {
    if (!allDone) return;
    if (scene.next) {
      goToScene(scene.next);
    }
  };

  const handleChoice = (choice: Choice) => {
    goToScene(choice.nextScene);
  };

  const goToScene = (nextId: string) => {
    setTransitioning(true);
    skipAll(); // Stop audio when transitioning
    setTimeout(() => {
      onNext(nextId);
    }, 400);
  };

  const hasChoices = scene.choices && scene.choices.length > 0;
  const showContinue = allDone && !hasChoices && !isEnd && scene.next;

  return (
    <div className={`story-screen ${transitioning ? "fade-out" : "fade-in"}`}>
      <ProgressBar current={progress} total={totalScenes} />

      <div className="scene-content">
        <div className="scene-image-layer">
          <SceneBackground sceneId={scene.id} />
        </div>

        <div className="text-layer">
          <NarrationText
            sentences={sentences}
            currentSentenceIndex={currentSentenceIndex}
            allDone={allDone}
            onSkip={skipAll}
            key={scene.id}
          />

          {hasChoices && allDone && (
            <ChoiceButtons
              choices={scene.choices!}
              onChoose={handleChoice}
              visible={allDone}
            />
          )}

          {showContinue && (
            <button className="continue-button" onClick={handleAdvance}>
              Continue...
            </button>
          )}

          {isEnd && allDone && (
            <button className="restart-button" onClick={onRestart}>
              Read Again!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
