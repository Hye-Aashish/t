"use client";

import { useState } from "react";

import Sidebar from "./components/Sidebar";
import LoginModal from "./components/Loginmodal";
import RegisterModal from "./components/RegisterModal";
import Navbar from "./components/Navbar";
import GameSection from "./components/GameSection";
import GameTabs from "./components/GameTabs";
import PromoCards from "./components/PromoCards";
import Footer from "./components/Footer";
import RegionPopup from "./components/RegionPopup";
import MobileBottomNav from "./components/MobileBottomNav";
import ChatModal from "./components/ChatModal";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  // Login / Register Modal States
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  // Search & Chat Modal States
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

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
    <div className="min-h-screen bg-[#0f202b] pb-16 md:pb-0">

      {/* =====================================================
          DESKTOP LAYOUT
      ====================================================== */}

      <div className="flex min-h-screen">

        {/* ================= DESKTOP SIDEBAR ================= */}

        <aside className="hidden md:block z-40">
          <Sidebar
            mobileOpen={true}
            onClose={() => setMobileOpen(false)}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onOpenChat={() => setChatOpen(true)}
          />
        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <main
          className={`
            min-h-screen
            w-full
            bg-[#0f202b]
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
          />
          {/* <RegionPopup/> */}

          {/* Game Section */}
          <GameSection
            onRegisterClick={openRegister}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
          />

          {/* Promo Cards */}
          {/* <PromoCards /> */}

          {/* Game Tabs */}
          <GameTabs />

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}

      <div className="md:hidden">
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenChat={() => setChatOpen(true)}
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

    </div>
  );
}
