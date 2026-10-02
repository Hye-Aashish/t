"use client";

import { useState } from "react";
import {
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaUserCircle,
} from "react-icons/fa";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onRegisterClick,
}: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

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

  const handleDemoLogin = async () => {
    setError("");
    setDemoLoading(true);
    try {
      const res = await fetch("/api/auth/demo", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Demo login failed");
      }
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Demo login failed");
    } finally {
      setDemoLoading(false);
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
          border-[#344754]
          bg-[#172633]
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="relative border-b border-[#2d414e] px-5 py-3.5 text-center">
          <h2 className="text-[13px] font-bold text-white">Sign In</h2>
          <p className="mt-0.5 text-[10px] text-[#7f8f99]">
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
              text-[#8a9ca7]
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
            <div className="mb-3 rounded bg-red-500/20 px-3 py-2 text-[10px] text-red-400">
              {error}
            </div>
          )}

          {/* Email or Username */}
          <div className="mb-3.5">
            <label className="mb-1.5 block text-[10px] font-semibold text-[#8b99a2]">
              Email or Username <span className="text-[#e74c3c]">*</span>
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email or username"
              className="
                h-[38px]
                w-full
                rounded-[4px]
                border
                border-[#2e4352]
                bg-[#0e1c26]
                px-3
                text-[11px]
                text-white
                placeholder:text-[#596974]
                outline-none
                transition
                focus:border-[#4be82f]
              "
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-[10px] font-semibold text-[#8b99a2]">
                Password <span className="text-[#e74c3c]">*</span>
              </label>
              <button
                type="button"
                className="text-[10px] text-[#4292e8] hover:underline cursor-pointer"
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
                  h-[38px]
                  w-full
                  rounded-[4px]
                  border
                  border-[#2e4352]
                  bg-[#0e1c26]
                  px-3
                  pr-9
                  text-[11px]
                  text-white
                  placeholder:text-[#596974]
                  outline-none
                  transition
                  focus:border-[#4be82f]
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-3
                  top-[11px]
                  text-[#7f8f9b]
                  hover:text-white
                  cursor-pointer
                "
              >
                {showPassword ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              mt-4
              h-[40px]
              w-full
              rounded-sm
              bg-[#1476df]
              text-[11px]
              font-bold
              text-white
              transition
              hover:bg-[#2585ed]
              active:scale-[0.99]
              disabled:opacity-50
              cursor-pointer
            "
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="my-3.5 flex items-center gap-2.5">
            <div className="h-px flex-1 bg-[#2e4352]" />
            <span className="text-[10px] text-[#6c7f8c]">Or</span>
            <div className="h-px flex-1 bg-[#2e4352]" />
          </div>

          {/* Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={demoLoading || loading}
            className="
              h-[38px]
              w-full
              rounded-sm
              bg-[#243a49]
              hover:bg-[#2c4759]
              border
              border-[#395364]
              text-[11px]
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
            {demoLoading ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <FaUserCircle size={15} className="text-[#3e91eb]" />
                <span>Demo Login</span>
              </>
            )}
          </button>
        </form>

        {/* Bottom */}
        <div className="border-t border-[#2d414e] px-4 py-3 text-center">
          <span className="text-[11px] text-[#7f8e98]">
            Don’t have an account?
          </span>
          <button
            type="button"
            onClick={onRegisterClick}
            className="
              ml-1.5
              text-[11px]
              font-bold
              text-[#3e91eb]
              hover:text-[#63a9f3]
              hover:underline
              cursor-pointer
              transition-colors
            "
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}