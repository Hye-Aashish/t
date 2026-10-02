"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";


import RegisterModal from "./RegisterModal";
import LoginModal from "./Loginmodal";

interface NavbarProps {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenLogin, onOpenRegister }) => {
  // Modal States
  const [internalLoginOpen, setInternalLoginOpen] = useState(false);
  const [internalRegisterOpen, setInternalRegisterOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

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
      {/* ================= NAVBAR ================= */}
      <header
        className="
          relative
          w-full
          bg-[#142b3a]
          border-b border-[#203746]
          z-50
          shadow-[0_4px_12px_rgba(0,0,0,0.18),0_8px_20px_rgba(0,0,0,0.08)]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1548px]
            min-h-[78px]
            px-3
            sm:px-6
            xl:px-[34px]
            py-2
            flex
            items-center
            justify-between
            gap-3
          "
        >
          {/* ================= LOGO ================= */}
          <div className="flex items-center justify-start shrink-0">
            <Image
              src="/img/logo.webp"
              alt="Logo"
              width={180}
              height={60}
              priority
              className="
                w-[130px]
                h-[45px]

                sm:w-[145px]
                sm:h-[48px]

                md:w-[160px]
                md:h-[52px]

                lg:w-[180px]
                lg:h-[60px]

                object-contain
                object-left
                drop-shadow-[0_4px_5px_rgba(0,0,0,0.35)]
              "
            />
          </div>

          {/* ================= RIGHT BUTTONS ================= */}
          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-2.5
              md:gap-3
              shrink-0
            "
          >
            {user ? (
              <>
                <div className="text-white text-sm font-semibold mr-2">
                  Welcome, {user.username || user.email.split("@")[0]}
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    items-center
                    justify-center
                    h-[38px]
                    sm:h-[41px]
                    md:h-[43px]
                    lg:h-[45px]
                    px-3
                    sm:px-4
                    md:px-5
                    lg:px-[22px]
                    rounded-[8px]
                    sm:rounded-[9px]
                    lg:rounded-[10px]
                    bg-[#e74c3c]
                    text-white
                    text-[12px]
                    sm:text-[13px]
                    md:text-[14px]
                    lg:text-[15px]
                    font-semibold
                    whitespace-nowrap
                    hover:bg-[#c0392b]
                    transition-all
                    duration-200
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* ================= SIGN IN ================= */}
                <button
                  type="button"
                  onClick={openLogin}
                  className="
                    flex
                    items-center
                    justify-center

                    h-[38px]
                    sm:h-[41px]
                    md:h-[43px]
                    lg:h-[45px]

                    px-3
                    sm:px-4
                    md:px-5
                    lg:px-[22px]

                    rounded-[8px]
                    sm:rounded-[9px]
                    lg:rounded-[10px]

                    bg-[#3c5a70]
                    text-white

                    text-[12px]
                    sm:text-[13px]
                    md:text-[14px]
                    lg:text-[15px]

                    font-semibold
                    whitespace-nowrap

                    hover:bg-[#48687f]
                    hover:shadow-[0_4px_10px_rgba(0,0,0,0.18)]

                    transition-all
                    duration-200
                  "
                >
                  Sign In
                </button>

                {/* ================= REGISTER ================= */}
                <button
                  type="button"
                  onClick={openRegister}
                  className="
                    flex
                items-center
                justify-center

                h-[38px]
                sm:h-[41px]
                md:h-[43px]
                lg:h-[45px]

                px-3
                sm:px-4
                md:px-5
                lg:px-[22px]

                rounded-[8px]
                sm:rounded-[9px]
                lg:rounded-[10px]

                bg-[#1476df]
                text-white

                text-[12px]
                sm:text-[13px]
                md:text-[14px]
                lg:text-[15px]

                font-semibold
                whitespace-nowrap

                hover:bg-[#2585ed]
                hover:shadow-[0_4px_10px_rgba(20,118,223,0.25)]

                transition-all
                duration-200
              "
            >
              Register
            </button>
            </>
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