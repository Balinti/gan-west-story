import type { Story } from "../story";
import { ganWest, ganWestSceneImages } from "./ganWest";
import { zoo, zooSceneImages } from "./zoo";

export const stories: Story[] = [ganWest, zoo];

export const storiesById: Record<string, Story> = {
  [ganWest.id]: ganWest,
  [zoo.id]: zoo,
};

export const allSceneImages: Record<string, string> = {
  ...ganWestSceneImages,
  ...zooSceneImages,
};
