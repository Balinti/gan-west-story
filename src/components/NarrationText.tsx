type SentenceInfo = {
  sentence: number;
  text: string;
  file: string;
};

type Props = {
  sentences: SentenceInfo[];
  currentSentenceIndex: number;
  allDone: boolean;
  onSkip: () => void;
};

export default function NarrationText({
  sentences,
  currentSentenceIndex,
  allDone,
  onSkip,
}: Props) {
  // Show all sentences up to and including current
  const visibleText = sentences
    .slice(0, currentSentenceIndex + 1)
    .map((s) => s.text)
    .join(" ");

  return (
    <div className="narration-container" onClick={onSkip}>
      <p className="narration-text">{visibleText}</p>
      {!allDone && <span className="skip-hint">Tap to skip</span>}
    </div>
  );
}
