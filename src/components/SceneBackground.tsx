import { allSceneImages } from "../data/stories";

type Props = {
  sceneId: string;
};

export default function SceneBackground({ sceneId }: Props) {
  const src = allSceneImages[sceneId];

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
