const base = import.meta.env.BASE_URL;

const sceneImages: Record<string, string> = {
  opening: `${base}scenes/opening.png`,
  "arrivals-1": `${base}scenes/arrivals-1.png`,
  "arrivals-2": `${base}scenes/arrivals-2.png`,
  "first-choice": `${base}scenes/first-choice.png`,
  "circle-time": `${base}scenes/circle-time.png`,
  "free-play": `${base}scenes/free-play.png`,
  "snack-time": `${base}scenes/snack-time.png`,
  mystery: `${base}scenes/mystery.png`,
  "search-playground": `${base}scenes/search-playground.png`,
  "search-art": `${base}scenes/search-art.png`,
  "search-sarah": `${base}scenes/search-sarah.png`,
  "found-sparkle": `${base}scenes/found-sparkle.png`,
  "art-choice": `${base}scenes/art-choice.png`,
  "art-challah": `${base}scenes/art-challah.png`,
  "art-mezuzah": `${base}scenes/art-mezuzah.png`,
  "outdoor-play": `${base}scenes/outdoor-play.png`,
  "shabbat-prep": `${base}scenes/shabbat-prep.png`,
  closing: `${base}scenes/closing.png`,
  end: `${base}scenes/end.png`,
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
