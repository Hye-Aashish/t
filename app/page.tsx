"use client";

import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import LoginModal from "./components/Loginmodal";
import RegisterModal from "./components/RegisterModal";
import DemoNoticeModal from "./components/DemoNoticeModal";
import Navbar from "./components/Navbar";
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
  useEffect(() => {
    const handleOpenDemo = () => setDemoNoticeOpen(true);
    window.addEventListener("open-demo-notice", handleOpenDemo);
    return () => window.removeEventListener("open-demo-notice", handleOpenDemo);
  }, []);

  // Fluctuate all numbers on the page every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      let node;
      while ((node = walk.nextNode())) {
        if (
          node.parentElement &&
          ['SCRIPT', 'STYLE', 'NOSCRIPT', 'INPUT', 'TEXTAREA'].includes(node.parentElement.tagName)
        ) continue;
        
        const text = node.nodeValue;
        if (text && /\d/.test(text)) {
          const newText = text.replace(/\b\d+(?:,\d+)*(?:\.\d+)?\b/g, (match) => {
             const numStr = match.replace(/,/g, '');
             const num = parseFloat(numStr);
             if (isNaN(num)) return match;
             
             // Randomly increase or decrease by up to 5% or at least 1
             const fluctuation = Math.max(1, Math.abs(num * (Math.random() * 0.1 - 0.05)));
             const sign = Math.random() > 0.5 ? 1 : -1;
             let newNum = num + sign * fluctuation;
             if (newNum < 0) newNum = 0; // avoid negative if it wasn't
             
             if (Number.isInteger(num) || match.indexOf('.') === -1) {
               newNum = Math.round(newNum);
             } else {
               const decimals = match.split('.')[1]?.length || 2;
               newNum = parseFloat(newNum.toFixed(decimals));
             }
             
             if (match.includes(',')) {
                return newNum.toLocaleString('en-US');
             }
             return newNum.toString();
          });
          
          if (newText !== text) {
            node.nodeValue = newText;
          }
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
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
            onOpenDemoNotice={() => setDemoNoticeOpen(true)}
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
          {/* <RegionPopup/> */}

          {/* Game Section */}
          <GameSection
            onRegisterClick={openRegister}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            onOpenDemoNotice={() => setDemoNoticeOpen(true)}
          />

          {/* Promo Cards */}
          {/* <PromoCards /> */}

          {/* Game Tabs */}
          <GameTabs onOpenDemoNotice={() => setDemoNoticeOpen(true)} />

          {/* GK Club & Multiplayer Games Section */}
          <GKGamesSection onOpenDemoNotice={() => setDemoNoticeOpen(true)} />

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
            setDemoNoticeOpen(true);
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
