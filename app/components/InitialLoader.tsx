"use client";

import { useEffect, useRef, useState } from "react";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [hasPlayedSound, setHasPlayedSound] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriggeredRef = useRef(false);

  // Synthesize rich arcade & casino gaming sound effect with Web Audio API
  const playSynthesizedGamingSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // 1. Deep warm gaming bass power-on surge
      const oscBass = ctx.createOscillator();
      const gainBass = ctx.createGain();
      oscBass.type = "sine";
      oscBass.frequency.setValueAtTime(130, now);
      oscBass.frequency.exponentialRampToValueAtTime(55, now + 0.45);
      gainBass.gain.setValueAtTime(0.35, now);
      gainBass.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      oscBass.connect(gainBass);
      gainBass.connect(ctx.destination);
      oscBass.start(now);
      oscBass.stop(now + 0.6);

      // 2. Ascending arcade / electronic gaming arpeggio (C5 -> E5 -> G5 -> C6 -> E6 -> G6)
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + 0.05 + i * 0.1;
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.24, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.5);
      });

      // 3. Casino coin collection pings & dice clatter
      for (let k = 0; k < 12; k++) {
        const oscCoin = ctx.createOscillator();
        const gainCoin = ctx.createGain();
        const t = now + 0.35 + k * 0.08;
        const f = 2200 + (k % 4) * 350;
        oscCoin.type = "sine";
        oscCoin.frequency.setValueAtTime(f, t);
        gainCoin.gain.setValueAtTime(0.12, t);
        gainCoin.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        oscCoin.connect(gainCoin);
        gainCoin.connect(ctx.destination);
        oscCoin.start(t);
        oscCoin.stop(t + 0.12);
      }

      // 4. Grand casino jackpot chime & sparkle
      const sparkles = [2093.00, 2637.02, 3135.96, 4186.01, 3135.96];
      sparkles.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + 0.85 + i * 0.14;
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.5);
      });
    } catch {}
  };

  const playGamingSound = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setHasPlayedSound(true);

    // Play synthesized electronic gaming chime
    playSynthesizedGamingSound();

    // Play studio audio file through HTML5 Audio element
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 1.0;
      const promise = audio.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    }
  };

  useEffect(() => {
    // Start video animation (muted ensures video is never blocked by browser)
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }

    // Try playing gaming sound immediately on mount
    playGamingSound();

    // Fallback: listen for any user touch, click, or keypress to immediately trigger sound
    const handleUserInteraction = () => {
      playGamingSound();
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
    };

    window.addEventListener("pointerdown", handleUserInteraction, { once: true });
    window.addEventListener("touchstart", handleUserInteraction, { once: true });
    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("keydown", handleUserInteraction, { once: true });

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
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      onClick={playGamingSound}
      onTouchStart={playGamingSound}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-all duration-700 ease-out select-none overflow-hidden cursor-pointer ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{
        background: "#0b1720",
      }}
    >
      {/* Studio Gaming & Casino Audio Source */}
      <audio ref={audioRef} preload="auto">
        <source src="/audio/gaming-sound.wav" type="audio/wav" />
        <source src="/audio/casino-win.mp3" type="audio/mpeg" />
        <source src="/audio/slot-reel.mp3" type="audio/mpeg" />
      </audio>

      {/* Centered Video Loader */}
      <div className="relative flex flex-col items-center justify-center w-[300px] sm:w-[420px] md:w-[480px] max-w-[92vw]">
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

        {/* Dynamic Gaming Audio Status Pill */}
        <div className="mt-2 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide backdrop-blur-sm animate-pulse">
          <span className="text-sm">🎮</span>
          <span>NON STOP CASINO</span>
          <span className="text-[11px] text-emerald-300/80">
            {hasPlayedSound ? "• 🔊 Audio On" : "• Tap for Sound 🔊"}
          </span>
        </div>
      </div>
    </div>
  );
}