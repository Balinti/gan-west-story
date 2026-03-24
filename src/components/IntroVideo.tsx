import { useRef, useState, useCallback } from "react";

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  const handleDone = useCallback(() => {
    if (fadingOut) return;
    setFadingOut(true);
    setTimeout(onComplete, 400);
  }, [fadingOut, onComplete]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={`intro-container${fadingOut ? " intro-fade-out" : ""}`}>
      <video
        ref={videoRef}
        className="intro-video"
        src="/intro/kidstory-intro.mp4"
        autoPlay
        playsInline
        muted
        onEnded={handleDone}
      />
      <button className="intro-skip-btn" onClick={handleDone}>
        Skip
      </button>
      <button className="intro-unmute-btn" onClick={toggleMute}>
        {muted ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0012 7.5v2a2.5 2.5 0 010 5v2A4.5 4.5 0 0016.5 12zM12 1v2a9 9 0 010 18v2A11 11 0 0012 1z" opacity="0.3" />
            <path d="M16.5 12A4.5 4.5 0 0012 7.5v2a2.5 2.5 0 010 5v2A4.5 4.5 0 0016.5 12z" />
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <line x1="2" y1="2" x2="22" y2="22" stroke="white" strokeWidth="2" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
            <path d="M16.5 12A4.5 4.5 0 0012 7.5v2a2.5 2.5 0 010 5v2A4.5 4.5 0 0016.5 12z" />
            <path d="M12 1v2a9 9 0 010 18v2A11 11 0 0012 1z" opacity="0.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
