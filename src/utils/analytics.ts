// GA4 Analytics helpers (COPPA-compliant — no ad personalization, anonymized IP)

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function trackSceneView(storyId: string, sceneId: string) {
  window.gtag?.("event", "scene_view", { story_id: storyId, scene_id: sceneId });
}

export function trackChoiceMade(storyId: string, choiceLabel: string, fromScene: string, toScene: string) {
  window.gtag?.("event", "choice_made", {
    story_id: storyId,
    choice_label: choiceLabel,
    from_scene: fromScene,
    to_scene: toScene,
  });
}

export function trackStoryStarted(storyId: string) {
  window.gtag?.("event", "story_started", { story_id: storyId });
}

export function trackStoryCompleted(storyId: string) {
  window.gtag?.("event", "story_completed", { story_id: storyId });
}
