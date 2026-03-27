export type Choice = {
  label: string;
  nextScene: string;
  image?: string;
};

export type Scene = {
  id: string;
  text: string;
  characters: string[];
  background: string;
  choices?: Choice[];
  next?: string;
};

export type AudioEntry = {
  sentence: number;
  text: string;
  file: string;
};

export type Story = {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  scenes: Record<string, Scene>;
  mainPathScenes: string[];
  audioManifest: Record<string, AudioEntry[]>;
  firstSceneId: string;
  endSceneId: string;
  /** If true, scenes were generated in 16:9 landscape and need landscape viewing */
  landscape?: boolean;
};
