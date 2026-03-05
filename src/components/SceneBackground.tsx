import { backgroundComponents } from "../backgrounds/backgrounds";

type Props = {
  backgroundKey: string;
};

export default function SceneBackground({ backgroundKey }: Props) {
  const BgComponent = backgroundComponents[backgroundKey];

  if (!BgComponent) {
    return (
      <div className="scene-background fallback">
        <svg viewBox="0 0 800 400" className="scene-bg">
          <rect width={800} height={400} fill="#FFF8E7" />
          <rect y={280} width={800} height={120} fill="#DEB887" />
        </svg>
      </div>
    );
  }

  return (
    <div className="scene-background">
      <BgComponent />
    </div>
  );
}
