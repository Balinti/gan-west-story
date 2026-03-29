import type { Story } from "../story";
import { ganWest, ganWestSceneImages } from "./ganWest";
import { zoo, zooSceneImages } from "./zoo";
import { forum, forumSceneImages } from "./forum";
import { pool, poolSceneImages } from "./pool";
import { uganda, ugandaSceneImages } from "./uganda";
import { palmsprings, palmspringsSceneImages } from "./palmsprings";

/** Stories shown in the main menu */
export const stories: Story[] = [ganWest, zoo, forum, palmsprings, uganda];

/** Hidden stories accessible via direct URL only */
export const hiddenStories: Story[] = [pool];

export const storiesById: Record<string, Story> = {
  [ganWest.id]: ganWest,
  [zoo.id]: zoo,
  [forum.id]: forum,
  [pool.id]: pool,
  [uganda.id]: uganda,
  [palmsprings.id]: palmsprings,
};

export const allSceneImages: Record<string, string> = {
  ...ganWestSceneImages,
  ...zooSceneImages,
  ...forumSceneImages,
  ...poolSceneImages,
  ...ugandaSceneImages,
  ...palmspringsSceneImages,
};
