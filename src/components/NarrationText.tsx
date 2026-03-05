import { useState, useEffect, useRef } from "react";

type Props = {
  text: string;
  onComplete: () => void;
  speed?: number;
};

export default function NarrationText({ text, onComplete, speed = 35 }: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setIsComplete(false);
    indexRef.current = 0;

    intervalRef.current = window.setInterval(() => {
      indexRef.current++;
      if (indexRef.current >= text.length) {
        setDisplayedText(text);
        setIsComplete(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        onComplete();
      } else {
        setDisplayedText(text.slice(0, indexRef.current));
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, onComplete]);

  const handleSkip = () => {
    if (!isComplete) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayedText(text);
      setIsComplete(true);
      onComplete();
    }
  };

  return (
    <div className="narration-container" onClick={handleSkip}>
      <p className="narration-text">{displayedText}</p>
      {!isComplete && (
        <span className="skip-hint">Tap to skip</span>
      )}
    </div>
  );
}
