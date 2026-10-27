"use client";

import { useState, useEffect, useRef } from "react";

import Sidebar from "./components/Sidebar";
import LoginModal from "./components/Loginmodal";
import RegisterModal from "./components/RegisterModal";
import DemoNoticeModal from "./components/DemoNoticeModal";
import Navbar from "./components/Navbar";
import TopOffersBanner from "./components/TopOffersBanner";
import GameSection from "./components/GameSection";
import GameTabs from "./components/GameTabs";
import GKGamesSection from "./components/GKGamesSection";
import PromoCards from "./components/PromoCards";
import Footer from "./components/Footer";
import RegionPopup from "./components/RegionPopup";
import MobileBottomNav from "./components/MobileBottomNav";
import ChatModal from "./components/ChatModal";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Login / Register / Demo Modal States
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [demoNoticeOpen, setDemoNoticeOpen] = useState(false);

  // Search & Chat Modal States
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  // Global listener for opening demo notice from anywhere
  const userRef = useRef<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          userRef.current = data.user;
        }
      })
      .catch(() => {});
  }, []);

  const handleGameClick = () => {
    if (userRef.current) {
      setDemoNoticeOpen(true);
    } else {
      setLoginOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("open-demo-notice", handleGameClick);
    return () => window.removeEventListener("open-demo-notice", handleGameClick);
  }, []);

  // Open Login
  const openLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  // Open Register
  const openRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  // Close both
  const closeModals = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0f212e] pb-16 md:pb-0">

      {/* =====================================================
          DESKTOP LAYOUT
      ====================================================== */}

      <div className="flex min-h-screen">

        {/* ================= DESKTOP SIDEBAR ================= */}

        <aside className="hidden md:block z-40">
          <Sidebar
            isMobile={false}
            mobileOpen={true}
            onClose={() => setMobileOpen(false)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onOpenChat={() => setChatOpen(true)}
            onOpenDemoNotice={handleGameClick}
          />
        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <main
          className={`
            min-h-screen
            w-full
            bg-[#0f212e]
            transition-all
            duration-300
            ease-in-out
            ${sidebarCollapsed ? "md:ml-[78px] md:w-[calc(100%-78px)]" : "md:ml-[264px] md:w-[calc(100%-264px)]"}
          `}
        >
          {/* Navbar */}
          <Navbar
            onOpenLogin={openLogin}
            onOpenRegister={openRegister}
            onToggleMobileMenu={() => setMobileOpen((prev) => !prev)}
          />
          {/* Game Section */}
          <GameSection
            onRegisterClick={openRegister}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            onOpenDemoNotice={handleGameClick}
          />

          {/* Promo Cards */}
          {/* <PromoCards /> */}

          {/* Game Tabs */}
          <GameTabs onOpenDemoNotice={handleGameClick} />

          {/* Top Mega Offers Banner (1. Range Rover, 2. Harley Davidson, 3. Laptop, 4. Phone) */}
          <TopOffersBanner onClaimOffer={openRegister} />

          {/* GK Club & Multiplayer Games Section (Popular Club & Arcade Games) */}
          <GKGamesSection onOpenDemoNotice={handleGameClick} />

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}

      <div className="md:hidden">
        <Sidebar
          isMobile={true}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          onOpenChat={() => {
            setMobileOpen(false);
            setChatOpen(true);
          }}
          onOpenDemoNotice={() => {
            setMobileOpen(false);
            handleGameClick();
          }}
        />
      </div>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
      ====================================================== */}

      <MobileBottomNav
        onOpenSearch={() => setSearchOpen(true)}
        onOpenChat={() => setChatOpen(true)}
      />

      {/* =====================================================
          CHAT MODAL
      ====================================================== */}

      <ChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />

      {/* =====================================================
          LOGIN MODAL
      ====================================================== */}

      <LoginModal
        isOpen={loginOpen}
        onClose={closeModals}
        onRegisterClick={openRegister}
      />

      {/* =====================================================
          REGISTER MODAL
      ====================================================== */}

      <RegisterModal
        isOpen={registerOpen}
        onClose={closeModals}
        onLoginClick={openLogin}
      />

      {/* =====================================================
          DEMO NOTICE MODAL (Triggered from any game / sidebar)
      ====================================================== */}

      <DemoNoticeModal
        isOpen={demoNoticeOpen}
        onClose={() => setDemoNoticeOpen(false)}
      />

    </div>
  );
}
