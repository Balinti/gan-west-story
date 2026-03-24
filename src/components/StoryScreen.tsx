import { useState, useEffect } from "react";
import type { Scene, Choice } from "../data/story";
import SceneBackground from "./SceneBackground";
import NarrationText from "./NarrationText";
import ChoiceButtons from "./ChoiceButtons";
import ProgressBar from "./ProgressBar";
import { useSceneAudio } from "../hooks/useSceneAudio";
import { trackChoiceMade } from "../utils/analytics";

type Props = {
  scene: Scene;
  sceneId: string;
  onNext: (nextSceneId: string) => void;
  onBack: () => void;
  canGoBack: boolean;
  onHome: () => void;
  progress: number;
  totalScenes: number;
  isEnd: boolean;
  onRestart: () => void;
};

export default function StoryScreen({
  scene,
  sceneId,
  onNext,
  onBack,
  canGoBack,
  onHome,
  progress,
  totalScenes,
  isEnd,
  onRestart,
}: Props) {
  const [transitioning, setTransitioning] = useState(false);
  const { sentences, currentSentenceIndex, allDone, skipAll } = useSceneAudio(
    sceneId
  );

  // Reset transition state when scene changes
  useEffect(() => {
    setTransitioning(false);
  }, [sceneId]);

  const handleAdvance = () => {
    if (!allDone) return;
    if (scene.next) {
      goToScene(scene.next);
    }
  };

  const handleChoice = (choice: Choice) => {
    trackChoiceMade(choice.label, sceneId, choice.nextScene);
    goToScene(choice.nextScene);
  };

  const goToScene = (nextId: string) => {
    setTransitioning(true);
    skipAll();
    setTimeout(() => {
      onNext(nextId);
    }, 400);
  };

  const hasChoices = scene.choices && scene.choices.length > 0;
  const showContinue = allDone && !hasChoices && !isEnd && scene.next;

  return (
    <div className={`story-screen ${transitioning ? "fade-out" : "fade-in"}`}>
      <ProgressBar current={progress} total={totalScenes} />

      {canGoBack && (
        <button className="back-button" onClick={onBack} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <button className="home-button" onClick={onHome} aria-label="Home">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="scene-content">
        <div className="scene-image-layer">
          <SceneBackground sceneId={sceneId} />
        </div>

        <div className="text-layer">
          <NarrationText
            sentences={sentences}
            currentSentenceIndex={currentSentenceIndex}
            allDone={allDone}
            onSkip={skipAll}
            key={sceneId}
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
