import type { Story } from "../story";
import { ganWest, ganWestSceneImages } from "./ganWest";
import { zoo, zooSceneImages } from "./zoo";
import { forum, forumSceneImages } from "./forum";
import { pool, poolSceneImages } from "./pool";
import { uganda, ugandaSceneImages } from "./uganda";
import { palmsprings, palmspringsSceneImages } from "./palmsprings";
import { zoo2, zoo2SceneImages } from "./zoo2";
import { blueyPlayground, blueyPlaygroundSceneImages } from "./bluey-playground";

/** Stories shown in the main menu */
export const stories: Story[] = [ganWest, zoo2, forum, palmsprings, uganda];

/** Hidden stories accessible via direct URL only (keyed by URL number) */
export const hiddenStories: Record<number, Story> = {
  1: pool,
  2: blueyPlayground,
};

export const storiesById: Record<string, Story> = {
  [ganWest.id]: ganWest,
  [zoo.id]: zoo,
  [forum.id]: forum,
  [pool.id]: pool,
  [uganda.id]: uganda,
  [palmsprings.id]: palmsprings,
  [zoo2.id]: zoo2,
  [blueyPlayground.id]: blueyPlayground,
};

export const allSceneImages: Record<string, string> = {
  ...ganWestSceneImages,
  ...zooSceneImages,
  ...forumSceneImages,
  ...poolSceneImages,
  ...ugandaSceneImages,
  ...palmspringsSceneImages,
  ...zoo2SceneImages,
  ...blueyPlaygroundSceneImages,
};
