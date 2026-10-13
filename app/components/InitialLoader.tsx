"use client";

import { useEffect, useRef, useState } from "react";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }

    const audio = audioRef.current;
    let hasPlayed = false;

    const playDiceSound = () => {
      if (hasPlayed) return;
      if (audio) {
        audio.currentTime = 0;
        audio.volume = 1.0;
        const promise = audio.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              hasPlayed = true;
            })
            .catch(() => {
              // Browser autoplay policy might restrict audio until user interaction
            });
        }
      }
    };

    // Attempt playing dice sound immediately upon mount
    playDiceSound();

    // Fallback: in case browser strictly requires a user gesture for audio
    const unlockAudio = () => {
      playDiceSound();
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });
    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    // Clean preloader duration (~2.5s)
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }, 2500);

    return () => {
      clearTimeout(timer);
      cleanupListeners();
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      onClick={() => {
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-all duration-700 ease-out select-none overflow-hidden cursor-pointer ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{
        background: "#0b1720",
      }}
    >
      {/* Authentic Dice Roll Audio */}
      <audio ref={audioRef} preload="auto">
        <source src="/audio/dice-roll.mp3" type="audio/mpeg" />
        <source src="/audio/dice-roll.wav" type="audio/wav" />
        <source src="/audio/dice-roll.ogg" type="audio/ogg" />
      </audio>

      {/* Centered Video Loader - Seamlessly merged without any bottom line */}
      <div className="relative flex items-center justify-center w-[300px] sm:w-[420px] md:w-[480px] max-w-[92vw]">
        <video
          ref={videoRef}
          src="/img/loader3.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className="w-full h-auto object-contain pointer-events-none select-none mix-blend-screen"
          style={{
            filter: "contrast(175%) brightness(88%)",
            maskImage:
              "radial-gradient(ellipse 96% 92% at 50% 50%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 96% 92% at 50% 50%, black 82%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}