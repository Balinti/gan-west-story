import { useState, useEffect, useRef, useCallback } from "react";
import { stories, hiddenStories } from "../data/stories";
import type { AudioEntry } from "../data/story";

const base = import.meta.env.BASE_URL;

// Build a combined audio manifest from all stories.
// Resolve each entry's audio file to a full URL based on its parent story.id,
// since audio is now organized under public/stories/<story-id>/audio/.
const combinedManifest: Record<string, AudioEntry[]> = {};
for (const story of [...stories, ...Object.values(hiddenStories)]) {
  for (const [sceneId, entries] of Object.entries(story.audioManifest)) {
    combinedManifest[sceneId] = entries.map((e) => ({
      ...e,
      file: `${base}stories/${story.id}/audio/${e.file}`,
    }));
  }
}

export function useSceneAudio(sceneId: string) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sceneIdRef = useRef(sceneId);

  const sentences = combinedManifest[sceneId] || [];

  // Reset when scene changes
  useEffect(() => {
    sceneIdRef.current = sceneId;
    setCurrentSentenceIndex(0);
    setAllDone(false);
    setIsPlaying(false);

    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    const currentSentences = combinedManifest[sceneId] || [];

    // Start playing first sentence
    if (currentSentences.length > 0) {
      playSentence(0);
    } else {
      setAllDone(true);
    }

    // Cleanup on unmount or scene change — stop audio immediately
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId]);

  const playSentence = useCallback(
    (index: number) => {
      const s = combinedManifest[sceneIdRef.current];
      if (!s || index >= s.length) {
        setAllDone(true);
        setIsPlaying(false);
        return;
      }

      // file is already a full URL (resolved when combinedManifest was built)
      const audio = new Audio(s[index].file);
      audioRef.current = audio;
      setCurrentSentenceIndex(index);
      setIsPlaying(true);

      audio.addEventListener("ended", () => {
        const nextIndex = index + 1;
        if (nextIndex < s.length) {
          playSentence(nextIndex);
        } else {
          setAllDone(true);
          setIsPlaying(false);
        }
      });

      audio.addEventListener("error", () => {
        const nextIndex = index + 1;
        if (nextIndex < s.length) {
          playSentence(nextIndex);
        } else {
          setAllDone(true);
          setIsPlaying(false);
        }
      });

      audio.play().catch(() => {
        setAllDone(true);
        setIsPlaying(false);
      });
    },
    []
  );

  const skipAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setCurrentSentenceIndex(sentences.length - 1);
    setAllDone(true);
    setIsPlaying(false);
  }, [sentences.length]);

  return {
    sentences,
    currentSentenceIndex,
    isPlaying,
    allDone,
    skipAll,
  };
}
