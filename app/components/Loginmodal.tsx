"use client";

import { useState } from "react";
import {
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaUserCircle,
} from "react-icons/fa";
import DemoNoticeModal from "./DemoNoticeModal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
  redirectUrl?: string;
}

export default function LoginModal({
  isOpen,
  onClose,
  onRegisterClick,
  redirectUrl,
}: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoNoticeOpen, setDemoNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setError("");
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteDemoLogin = async () => {
    const res = await fetch("/api/auth/demo", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Demo login failed");
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/75
        px-3
      "
      onClick={handleClose}
    >
      {/* Modal - Compact matching RegisterModal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-[430px]
          max-h-[95vh]
          overflow-y-auto
          rounded-md
          border
          border-[#213743]
          bg-[#1a2c38]
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="relative border-b border-[#213743] px-5 py-3.5 text-center">
          <h2 className="text-[14px] font-bold text-white">Sign In</h2>
          <p className="mt-0.5 text-[11px] text-[#b1bad3]">
            Access your Non Stop Betting and Casino account
          </p>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="
              absolute
              right-4
              top-3.5
              text-[#b1bad3]
              hover:text-white
              transition-colors
              cursor-pointer
            "
          >
            <FaTimes size={13} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleLogin} className="p-5">
          {error && (
            <div className="mb-3 rounded bg-red-500/20 px-3 py-2 text-[11px] text-red-400">
              {error}
            </div>
          )}

          {/* Email or Username */}
          <div className="mb-3.5">
            <label className="mb-1.5 block text-[11px] font-semibold text-[#b1bad3]">
              Email or Username <span className="text-[#e74c3c]">*</span>
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email or username"
              className="
                h-[40px]
                w-full
                rounded-lg
                border
                border-[#213743]
                bg-[#0f212e]
                px-3
                text-[12px]
                text-white
                placeholder:text-[#557086]
                outline-none
                transition
                focus:border-[#1475e1]
              "
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-[11px] font-semibold text-[#b1bad3]">
                Password <span className="text-[#e74c3c]">*</span>
              </label>
              <button
                type="button"
                className="text-[11px] text-[#1475e1] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="
                  h-[40px]
                  w-full
                  rounded-lg
                  border
                  border-[#213743]
                  bg-[#0f212e]
                  px-3
                  pr-9
                  text-[12px]
                  text-white
                  placeholder:text-[#557086]
                  outline-none
                  transition
                  focus:border-[#1475e1]
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-[12px]
                  text-[#b1bad3]
                  hover:text-white
                  cursor-pointer
                "
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-4
              h-[42px]
              w-full
              rounded-lg
              bg-[#1475e1]
              text-[13px]
              font-bold
              text-white
              transition
              hover:bg-[#1d82f5]
              active:scale-[0.99]
              disabled:opacity-50
              cursor-pointer
            "
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="my-3.5 flex items-center gap-2.5">
            <div className="h-px flex-1 bg-[#213743]" />
            <span className="text-[11px] text-[#557086]">Or</span>
            <div className="h-px flex-1 bg-[#213743]" />
          </div>

          {/* Demo Login Button */}
          <button
            type="button"
            onClick={() => setDemoNoticeOpen(true)}
            disabled={loading}
            className="
              h-[40px]
              w-full
              rounded-lg
              bg-[#213743]
              hover:bg-[#2f4d5e]
              border
              border-[#213743]
              text-[12px]
              font-bold
              text-white
              transition
              flex
              items-center
              justify-center
              gap-2
              cursor-pointer
              active:scale-[0.99]
              disabled:opacity-50
            "
          >
            <FaUserCircle size={15} className="text-[#1475e1]" />
            <span>Demo Login</span>
          </button>
        </form>

        {/* Bottom */}
        <div className="border-t border-[#213743] px-4 py-3 text-center">
          <span className="text-[12px] text-[#b1bad3]">
            Don’t have an account?
          </span>
          <button
            type="button"
            onClick={onRegisterClick}
            className="
              ml-1.5
              text-[12px]
              font-bold
              text-[#1475e1]
              hover:text-white
              hover:underline
              cursor-pointer
              transition-colors
            "
          >
            Register
          </button>
        </div>
      </div>

      {/* Demo Notice Modal */}
      <DemoNoticeModal
        isOpen={demoNoticeOpen}
        onClose={() => setDemoNoticeOpen(false)}
        onContinueDemo={handleExecuteDemoLogin}
        redirectUrl={redirectUrl}
      />
    </div>
  );
}