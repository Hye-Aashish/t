"use client";

import { useEffect, useRef, useState } from "react";

export default function InitialLoader() {
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }

    // Clean preloader duration (~2.8s)
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 2800);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#0b1720] transition-opacity duration-500 ease-out select-none ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Soft warm ambient backlight */}
      <div className="absolute w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Video Loader seamlessly blended into background */}
      <div className="relative flex items-center justify-center w-[200px] sm:w-[230px] md:w-[250px]">
        <video
          ref={videoRef}
          src="/img/loader.mp4"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          className="w-full h-auto object-contain pointer-events-none select-none mix-blend-screen"
          style={{
            filter: "contrast(140%) brightness(80%)",
            maskImage: "radial-gradient(circle at center, black 40%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 75%)",
          }}
        />
      </div>
    </div>
  );
}