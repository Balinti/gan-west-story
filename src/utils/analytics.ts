// GA4 Analytics helpers (COPPA-compliant — no ad personalization, anonymized IP)

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export function trackSceneView(sceneId: string) {
  window.gtag?.("event", "scene_view", { scene_id: sceneId });
}

export function trackChoiceMade(choiceLabel: string, fromScene: string, toScene: string) {
  window.gtag?.("event", "choice_made", {
    choice_label: choiceLabel,
    from_scene: fromScene,
    to_scene: toScene,
  });
}

export function trackStoryStarted() {
  window.gtag?.("event", "story_started");
}

export function trackStoryCompleted() {
  window.gtag?.("event", "story_completed");
}
