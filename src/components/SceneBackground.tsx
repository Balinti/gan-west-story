const sceneImages: Record<string, string> = {
  opening: "/scenes/opening.png",
  "arrivals-1": "/scenes/arrivals-1.png",
  "arrivals-2": "/scenes/arrivals-2.png",
  "first-choice": "/scenes/first-choice.png",
  "circle-time": "/scenes/circle-time.png",
  "free-play": "/scenes/free-play.png",
  "snack-time": "/scenes/snack-time.png",
  mystery: "/scenes/mystery.png",
  "search-playground": "/scenes/search-playground.png",
  "search-art": "/scenes/search-art.png",
  "search-sarah": "/scenes/search-sarah.png",
  "found-sparkle": "/scenes/found-sparkle.png",
  "art-choice": "/scenes/art-choice.png",
  "art-challah": "/scenes/art-challah.png",
  "art-mezuzah": "/scenes/art-mezuzah.png",
  "outdoor-play": "/scenes/outdoor-play.png",
  "shabbat-prep": "/scenes/shabbat-prep.png",
  closing: "/scenes/closing.png",
  end: "/scenes/end.png",
};

type Props = {
  sceneId: string;
};

export default function SceneBackground({ sceneId }: Props) {
  const src = sceneImages[sceneId];

  if (!src) {
    return (
      <div className="scene-background fallback">
        <div className="scene-bg-placeholder" />
      </div>
    );
  }

  return (
    <div className="scene-background">
      <img src={src} alt="" className="scene-bg-image" />
    </div>
  );
}
