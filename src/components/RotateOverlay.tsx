import { useState, useEffect } from "react";

/**
 * Shows a "please rotate your phone" overlay when the device is in portrait
 * mode and the story has landscape images.
 */
export default function RotateOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const check = () => {
      // Show overlay if viewport is taller than wide (portrait)
      setShowOverlay(window.innerHeight > window.innerWidth);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!showOverlay) return null;

  return (
    <div className="rotate-overlay">
      <div className="rotate-content">
        <svg className="rotate-icon" width="64" height="64" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" rx="2" stroke="white" strokeWidth="1.5" />
          <path d="M20 16l2-2m0 0l2 2m-2-2v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="rotate-text">Please rotate your phone</p>
        <p className="rotate-subtext">This story is best in landscape mode</p>
      </div>
    </div>
  );
}
