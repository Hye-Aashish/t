"use client";

import { useState } from "react";
import {
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCalendarAlt,
} from "react-icons/fa";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
}: RegisterModalProps) {

  const [step, setStep] = useState<1 | 2>(1);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setError("");
    onClose();
  };

  const handleLoginClick = () => {
    setStep(1);
    setError("");
    onLoginClick();
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setError("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      
      // Successfully registered & logged in
      handleClose();
      // Reload page to reflect auth state
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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

      {/* Modal */}
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
        <div className="relative border-b border-[#213743] px-5 py-4 text-center">

          {/* Back */}
          {step === 2 && (
            <button
              type="button"
              onClick={handleBack}
              className="
                absolute
                left-4
                top-4
                text-[#b1bad3]
                hover:text-white
              "
            >
              <FaArrowLeft size={12} />
            </button>
          )}

          <h2 className="text-[15px] font-bold text-white">
            Create an Account
          </h2>

          <p className="mt-1 text-[11px] text-[#b1bad3]">
            Step {step}/2:{" "}
            {step === 1
              ? "Fill out your details"
              : "Complete your account"}
          </p>

          {/* Progress */}
          <div className="mx-auto mt-3 flex max-w-[180px] gap-1.5">

            <div
              className={`
                h-[4px]
                flex-1
                rounded-full
                ${step >= 1
                  ? "bg-[#1475e1]"
                  : "bg-[#213743]"
                }
              `}
            />

            <div
              className={`
                h-[4px]
                flex-1
                rounded-full
                ${step >= 2
                  ? "bg-[#1475e1]"
                  : "bg-[#213743]"
                }
              `}
            />

          </div>

          {/* Close */}
          <button
            type="button"
            onClick={handleClose}
            className="
              absolute
              right-4
              top-4
              text-[#b1bad3]
              hover:text-white
              transition-colors
            "
          >
            <FaTimes size={13} />
          </button>

        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
            className="p-4"
          >
            {error && step === 1 && (
              <div className="mb-3 rounded bg-red-500/20 px-3 py-2 text-[10px] text-red-500">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="mb-3.5">

              <label className="mb-1.5 block text-[11px] font-semibold text-[#b1bad3]">
                Email *
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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

            {/* Username */}
            <div className="mb-3.5">

              <label className="mb-1.5 block text-[11px] font-semibold text-[#b1bad3]">
                Username *
              </label>

              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
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
            <div className="mb-3">

              <label className="mb-1.5 block text-[11px] font-semibold text-[#b1bad3]">
                Password *
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#b1bad3]
                    hover:text-white
                  "
                >
                  {showPassword ? (
                    <FaEyeSlash size={13} />
                  ) : (
                    <FaEye size={13} />
                  )}
                </button>

              </div>

              <p className="mt-1 text-[10px] text-[#557086]">
                Your password must be 3-14 characters long.
              </p>

            </div>

            {/* Date */}
            <div className="mb-3.5">

              <label className="mb-1.5 block text-[11px] font-semibold text-[#b1bad3]">
                Date of Birth *
              </label>

              <div className="grid grid-cols-3 gap-2">

                <input
                  type="text"
                  placeholder="DD"
                  maxLength={2}
                  required
                  className="
                    h-[40px]
                    rounded-lg
                    border
                    border-[#213743]
                    bg-[#0f212e]
                    px-2.5
                    text-[12px]
                    text-white
                    outline-none
                    transition
                    focus:border-[#1475e1]
                  "
                />

                <select
                  required
                  className="
                    h-[40px]
                    rounded-lg
                    border
                    border-[#213743]
                    bg-[#0f212e]
                    px-2
                    text-[11px]
                    text-[#b1bad3]
                    outline-none
                    transition
                    focus:border-[#1475e1]
                  "
                >
                  <option value="">Month</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>

                <div className="relative">

                  <input
                    type="text"
                    placeholder="YYYY"
                    maxLength={4}
                    required
                    className="
                      h-[40px]
                      w-full
                      rounded-lg
                      border
                      border-[#213743]
                      bg-[#0f212e]
                      px-2.5
                      text-[12px]
                      text-white
                      outline-none
                      transition
                      focus:border-[#1475e1]
                    "
                  />

                  <FaCalendarAlt
                    size={11}
                    className="
                      absolute
                      right-2.5
                      top-1/2
                      -translate-y-1/2
                      text-[#557086]
                    "
                  />

                </div>

              </div>

            </div>

            {/* Phone */}
            <div className="mb-3.5">

              <label className="mb-1.5 block text-[11px] font-semibold text-[#b1bad3]">
                Phone (Optional)
              </label>

              <div className="grid grid-cols-[110px_1fr] gap-2">

                <select
                  className="
                    h-[40px]
                    rounded-lg
                    border
                    border-[#213743]
                    bg-[#0f212e]
                    px-2
                    text-[11px]
                    text-[#b1bad3]
                    outline-none
                    transition
                    focus:border-[#1475e1]
                  "
                >
                  <option>🇮🇳 +91</option>
                  <option>🇺🇸 +1</option>
                  <option>🇬🇧 +44</option>
                </select>

                <input
                  type="tel"
                  placeholder="Phone number"
                  className="
                    h-[40px]
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

            </div>

            {/* Promo */}
            <div className="mb-4">

              <label className="mb-1.5 block text-[11px] font-semibold text-[#b1bad3]">
                Promo Code (Optional)
              </label>

              <input
                type="text"
                placeholder="Promo code"
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

            {/* Continue */}
            <button
              type="submit"
              className="
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
                cursor-pointer
              "
            >
              Continue
            </button>

          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form
            onSubmit={handleRegister}
            className="p-5"
          >
            {error && step === 2 && (
              <div className="mb-3 rounded bg-red-500/20 px-3 py-2 text-[10px] text-red-500">
                {error}
              </div>
            )}

            <div className="mb-5 text-center">

              <div className="
                mx-auto
                mb-3
                flex
                h-[55px]
                w-[55px]
                items-center
                justify-center
                rounded-full
                bg-[#213743]
                text-[23px]
              ">
                ✉️
              </div>

              <h3 className="text-[15px] font-bold text-white">
                Complete Your Account
              </h3>

              <p className="mx-auto mt-1.5 max-w-[300px] text-[11px] leading-4 text-[#b1bad3]">
                Choose your account preferences and create
                your account.
              </p>

            </div>

            {/* Currency */}
            <div className="mb-4">

              <label className="mb-1.5 block text-[11px] font-semibold text-[#b1bad3]">
                Preferred Currency
              </label>

              <select
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
                  outline-none
                  transition
                  focus:border-[#1475e1]
                "
              >
                <option>INR - Indian Rupee (₹)</option>
                <option>USD - US Dollar ($)</option>
                <option>USDT - Tether (₮)</option>
                <option>EUR - Euro (€)</option>
              </select>

            </div>

            {/* Confirm Password */}
            <div className="mb-4">

              <label className="mb-1.5 block text-[11px] font-semibold text-[#b1bad3]">
                Confirm Password *
              </label>

              <div className="relative">

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
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
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#b1bad3]
                    hover:text-white
                  "
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={13} />
                  ) : (
                    <FaEye size={13} />
                  )}
                </button>

              </div>

            </div>

            {/* Terms */}
            <label className="mb-5 flex cursor-pointer items-start gap-2">

              <input
                type="checkbox"
                required
                className="mt-[2px] h-3.5 w-3.5 accent-[#1475e1]"
              />

              <span className="text-[11px] leading-4 text-[#b1bad3]">
                I agree to the{" "}
                <button
                  type="button"
                  className="text-[#1475e1] hover:underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-[#1475e1] hover:underline"
                >
                  Privacy Policy
                </button>
                .
              </span>

            </label>

            {/* Create */}
            <button
              type="submit"
              disabled={loading}
              className="
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
              {loading ? "Creating..." : "Create Account"}
            </button>

            {/* Back */}
            <button
              type="button"
              onClick={handleBack}
              className="
                mt-3
                h-[40px]
                w-full
                rounded-lg
                border
                border-[#213743]
                bg-[#213743]
                text-[12px]
                font-semibold
                text-white
                hover:bg-[#2f4d5e]
                transition
                cursor-pointer
              "
            >
              Back
            </button>

          </form>
        )}

        {/* Bottom */}
        <div className="border-t border-[#213743] px-4 py-3 text-center">

          <span className="text-[12px] text-[#b1bad3]">
            Already have an account?
          </span>

          <button
            type="button"
            onClick={handleLoginClick}
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
            Login
          </button>

        </div>

      </div>

    </div>
  );
}