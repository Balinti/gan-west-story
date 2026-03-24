import type { Story } from "../story";
import { ganWest, ganWestSceneImages } from "./ganWest";
import { zoo, zooSceneImages } from "./zoo";
import { forum, forumSceneImages } from "./forum";

export const stories: Story[] = [ganWest, zoo, forum];

export const storiesById: Record<string, Story> = {
  [ganWest.id]: ganWest,
  [zoo.id]: zoo,
  [forum.id]: forum,
};

export const allSceneImages: Record<string, string> = {
  ...ganWestSceneImages,
  ...zooSceneImages,
  ...forumSceneImages,
};
