"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaTimes, FaShieldAlt, FaArrowRight } from "react-icons/fa";

export const triggerDemoNotice = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-demo-notice"));
  }
};

interface DemoNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueDemo?: () => Promise<void> | void;
  redirectUrl?: string;
}

export default function DemoNoticeModal({
  isOpen,
  onClose,
  onContinueDemo,
  redirectUrl,
}: DemoNoticeModalProps) {
  const [loading, setLoading] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const preloaderVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (showPreloader && preloaderVideoRef.current) {
      preloaderVideoRef.current.play().catch(() => {});
    }
  }, [showPreloader]);

  if (!isOpen) return null;

  if (showPreloader) {
    return (
      <div
        className="fixed inset-0 z-[999999] flex flex-col items-center justify-center select-none overflow-hidden animate-in fade-in duration-300"
        style={{
          background: "#0b1720",
        }}
      >
        {/* Centered Video Loader - Matching InitialLoader */}
        <div className="relative flex flex-col items-center justify-center w-[300px] sm:w-[420px] md:w-[480px] max-w-[92vw]">
          <video
            ref={preloaderVideoRef}
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

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello! I am using the Demo ID on Non Stop Betting and Casino. I want to get a Main / Real ID to play real games and deposit funds."
  )}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleContinue = async () => {
    setLoading(true);
    setShowPreloader(true);
    try {
      const startTime = Date.now();
      if (onContinueDemo) {
        await onContinueDemo();
      } else {
        try {
          await fetch("/api/auth/demo", { method: "POST" });
        } catch (e) {
          console.warn("Demo login fallback:", e);
        }
      }

      const target =
        redirectUrl ||
        process.env.NEXT_PUBLIC_DEMO_REDIRECT_URL ||
        "https://allpanelexch9.game/";

      const elapsed = Date.now() - startTime;
      const minDisplayTime = 2400; // Clean preloader duration
      const remainingTime = Math.max(0, minDisplayTime - elapsed);

      setTimeout(() => {
        if (target) {
          window.location.href = target;
        } else {
          window.location.reload();
        }
      }, remainingTime);
    } catch (err) {
      console.error("Demo login error:", err);
      setShowPreloader(false);
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 animate-in fade-in duration-200"
      onClick={showPreloader ? undefined : onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#213743] bg-[#1a2c38] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white animate-in zoom-in-95 duration-200"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#1475e1]/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={showPreloader ? undefined : onClose}
          disabled={showPreloader}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-[#b1bad3] hover:text-white hover:bg-[#213743] transition-colors cursor-pointer disabled:opacity-0"
          aria-label="Close modal"
        >
          <FaTimes size={14} />
        </button>

        <div className="p-6 text-center">
          {/* Brand Logo with Golden Glow */}
          <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#0f212e] border border-[#213743] shadow-lg shadow-black/50 p-2">
            <Image
              src="/img/logo.webp"
              alt="Non Stop Betting & Casino"
              width={72}
              height={72}
              priority
              className="object-contain drop-shadow-[0_4px_12px_rgba(255,193,7,0.3)] animate-pulse"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1475e1]/15 border border-[#1475e1]/30 text-[#1475e1] text-[11px] font-bold tracking-wider uppercase mb-3">
            <FaShieldAlt size={11} />
            <span>Demo Account Notice</span>
          </div>

          {/* Headline */}
          <h2 className="text-xl font-extrabold text-white tracking-tight mb-2">
            This is a Demo ID
          </h2>

          {/* English Notice Text */}
          <p className="text-xs sm:text-sm text-[#b1bad3] leading-relaxed mb-5">
            This account is for <span className="text-white font-semibold">trial & preview purposes only</span>. If you want a <span className="text-emerald-400 font-semibold">Main / Real ID</span> with real funds to play live games and withdraw cash winnings, please connect with our team on WhatsApp.
          </p>

          {/* Feature Highlights Box */}
          <div className="mb-6 rounded-xl bg-[#0f212e] border border-[#213743] p-3 text-left space-y-2 text-xs text-[#b1bad3]">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">✓</span>
              <span>Instant Main ID activation on WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">✓</span>
              <span>200% First Deposit Bonus & Fast Cashouts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">✓</span>
              <span>24/7 Dedicated Support & Fast UPI / Crypto</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            {/* 1. Connect on WhatsApp Button */}
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold flex items-center justify-center gap-2.5 shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all active:scale-[0.99] cursor-pointer"
            >
              <FaWhatsapp size={19} />
              <span>Connect on WhatsApp for Main ID</span>
            </button>

            {/* 2. Continue with Demo Button */}
            <button
              type="button"
              onClick={handleContinue}
              disabled={loading}
              className="w-full h-10 rounded-xl bg-[#213743] hover:bg-[#2f4d5e] text-[#b1bad3] hover:text-white border border-[#213743] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Logging in to Demo...</span>
                </>
              ) : (
                <>
                  <span>Continue with Demo ID</span>
                  <FaArrowRight size={11} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-[#0f212e] px-4 py-2.5 border-t border-[#213743] text-center text-[10px] text-[#557086]">
          Non Stop Betting and Casino • Official 24/7 Verified Support
        </div>
      </div>
    </div>
  );
}
