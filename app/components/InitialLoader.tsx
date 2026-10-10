"use client";

import { useEffect, useRef, useState } from "react";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play().catch(() => {});
    }

    // Clean preloader duration (~2.5s)
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-all duration-700 ease-out select-none overflow-hidden ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{
        background: "#0b1720",
      }}
    >
      {/* Centered Video Loader - Seamlessly merged without any bottom line */}
      <div className="relative flex items-center justify-center w-[300px] sm:w-[420px] md:w-[480px] max-w-[92vw]">
        <video
          ref={videoRef}
          src="/img/loader3.mp4"
          autoPlay
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