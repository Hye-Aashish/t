"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaUserCircle, FaWallet, FaSearch } from "react-icons/fa";
import RegisterModal from "./RegisterModal";
import LoginModal from "./Loginmodal";

interface NavbarProps {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  onToggleMobileMenu?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenRegister,
  onToggleMobileMenu,
}) => {
  // Modal States
  const [internalLoginOpen, setInternalLoginOpen] = useState(false);
  const [internalRegisterOpen, setInternalRegisterOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeMode, setActiveMode] = useState<"casino" | "sports">("casino");

  const loginOpen = internalLoginOpen;
  const registerOpen = internalRegisterOpen;

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.reload();
  };

  // Open Login
  const openLogin = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      setInternalRegisterOpen(false);
      setInternalLoginOpen(true);
    }
  };

  // Open Register
  const openRegister = () => {
    if (onOpenRegister) {
      onOpenRegister();
    } else {
      setInternalLoginOpen(false);
      setInternalRegisterOpen(true);
    }
  };

  // Close both
  const closeModals = () => {
    setInternalLoginOpen(false);
    setInternalRegisterOpen(false);
  };

  return (
    <>
      {/* ================= STAKE.COM NAVBAR ================= */}
      <header className="sticky top-0 w-full bg-[#1a2c38] border-b border-[#213743] z-50 shadow-md">
        <div className="mx-auto w-full max-w-[1580px] h-[64px] px-3 sm:px-6 xl:px-8 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* ================= LEFT: HAMBURGER, LOGO & DUAL SWITCHER ================= */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={onToggleMobileMenu}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-[#b1bad3] hover:text-white hover:bg-[#213743] transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Brand Logo - Fixed Sizing with Zero Overflow */}
            <div className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none">
              <div className="relative h-[36px] w-[36px] sm:h-[40px] sm:w-[40px] shrink-0">
                <Image
                  src="/img/logo.webp"
                  alt="Non Stop Betting and Casino"
                  fill
                  sizes="44px"
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[12px] sm:text-[14px] font-black tracking-wider text-white uppercase font-sans whitespace-nowrap">
                  NON STOP
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-[#1475e1] uppercase mt-0.5 whitespace-nowrap">
                  BETTING & CASINO
                </span>
              </div>
            </div>

            {/* Stake.com Signature Dual Switcher: Casino | Sports */}
            <div className="hidden lg:flex items-center bg-[#0f212e] p-1 rounded-full border border-[#213743] text-xs font-semibold select-none">
              <button
                type="button"
                onClick={() => setActiveMode("casino")}
                className={`cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${
                  activeMode === "casino"
                    ? "bg-[#213743] text-white shadow-sm"
                    : "text-[#b1bad3] hover:text-white"
                }`}
              >
                <span>🎰</span> Casino
              </button>
              <button
                type="button"
                onClick={() => setActiveMode("sports")}
                className={`cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-full transition-all ${
                  activeMode === "sports"
                    ? "bg-[#213743] text-white shadow-sm"
                    : "text-[#b1bad3] hover:text-white"
                }`}
              >
                <span>⚽</span> Sports
              </button>
            </div>
          </div>

          {/* ================= RIGHT: WALLET / AUTH BUTTONS ================= */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {user ? (
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Stake Wallet Pill */}
                <div className="flex items-center bg-[#0f212e] border border-[#213743] rounded-md pl-3 pr-1 py-1 gap-2.5">
                  <span className="text-[#b1bad3] text-xs font-semibold">₹</span>
                  <span className="font-mono text-sm font-bold text-white tracking-wide">
                    {user.balance !== undefined ? user.balance.toFixed(2) : "0.00"}
                  </span>
                  <button
                    type="button"
                    className="cursor-pointer bg-[#1475e1] hover:bg-[#1d82f5] text-white text-xs font-bold px-3 py-1.5 rounded transition-all active:scale-95 shadow-sm"
                  >
                    Wallet
                  </button>
                </div>

                {/* User Info & Logout */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#213743] border border-slate-600 flex items-center justify-center text-xs font-bold text-white uppercase">
                    {user.username ? user.username.substring(0, 2) : "U"}
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="cursor-pointer px-3 py-1.5 rounded-md bg-[#213743] hover:bg-[#2c4859] text-slate-300 hover:text-white text-xs font-semibold transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Stake-Style Sign In */}
                <button
                  type="button"
                  onClick={openLogin}
                  className="cursor-pointer flex items-center justify-center h-[38px] px-3.5 sm:px-4 rounded-md text-[#b1bad3] hover:text-white text-xs sm:text-sm font-semibold hover:bg-[#213743] transition-all select-none"
                >
                  Sign In
                </button>

                {/* Stake-Style Register Button */}
                <button
                  type="button"
                  onClick={openRegister}
                  className="cursor-pointer flex items-center justify-center h-[38px] px-4 sm:px-5 rounded-md bg-[#1475e1] hover:bg-[#1d82f5] text-white text-xs sm:text-sm font-bold shadow-[0_2px_8px_rgba(20,117,225,0.35)] transition-all select-none active:scale-95"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= LOGIN & REGISTER MODALS (Fallback) ================= */}
      {!onOpenLogin && !onOpenRegister && (
        <>
          <LoginModal
            isOpen={loginOpen}
            onClose={closeModals}
            onRegisterClick={openRegister}
          />
          <RegisterModal
            isOpen={registerOpen}
            onClose={closeModals}
            onLoginClick={openLogin}
          />
        </>
      )}
    </>
  );
};

export default Navbar;