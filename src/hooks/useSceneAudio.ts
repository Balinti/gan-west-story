import { useState, useEffect, useRef, useCallback } from "react";
import audioManifest from "../data/audioManifest.json";

const base = import.meta.env.BASE_URL;

type SentenceInfo = {
  sentence: number;
  text: string;
  file: string;
};

type ManifestType = Record<string, SentenceInfo[]>;
const manifest = audioManifest as ManifestType;

export function useSceneAudio(sceneId: string) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sceneIdRef = useRef(sceneId);

  const sentences = manifest[sceneId] || [];

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

    // Start playing first sentence
    if (sentences.length > 0) {
      playSentence(0);
    } else {
      setAllDone(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId]);

  const playSentence = useCallback(
    (index: number) => {
      const s = manifest[sceneIdRef.current];
      if (!s || index >= s.length) {
        setAllDone(true);
        setIsPlaying(false);
        return;
      }

      const audio = new Audio(`${base}audio/${s[index].file}`);
      audioRef.current = audio;
      setCurrentSentenceIndex(index);
      setIsPlaying(true);

      audio.addEventListener("ended", () => {
        // Move to next sentence
        const nextIndex = index + 1;
        if (nextIndex < s.length && sceneIdRef.current === sceneIdRef.current) {
          playSentence(nextIndex);
        } else {
          setAllDone(true);
          setIsPlaying(false);
        }
      });

      audio.addEventListener("error", () => {
        // Skip failed audio, move on
        const nextIndex = index + 1;
        if (nextIndex < s.length) {
          playSentence(nextIndex);
        } else {
          setAllDone(true);
          setIsPlaying(false);
        }
      });

      audio.play().catch(() => {
        // Autoplay blocked - mark as done so user can still interact
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
