"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiX, FiList, FiChevronDown, FiSmile } from "react-icons/fi";
import { generateSimulatedUsers, ChatUser } from "@/lib/simulatedChatData";

interface ChatMessageItem {
  id: string;
  username: string;
  badgeType?: "star" | "cyan_star" | "cake" | "c_logo" | "gold_star";
  levelBadge?: string;
  extraIcon?: string;
  text: string;
  isUser?: boolean;
  createdAt: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [onlineCount, setOnlineCount] = useState(59349);
  const [selectedLang, setSelectedLang] = useState("English");
  const [langDropdown, setLangDropdown] = useState(false);
  const [simulatedUsers] = useState<ChatUser[]>(() => generateSimulatedUsers());
  
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const userPointerRef = useRef(0);
  const msgPointerRef = useRef<Record<number, number>>({});

  // 1. Fetch DB Messages & Initialize Feed
  useEffect(() => {
    let isMounted = true;

    const initChatFeed = async () => {
      // Pre-fill full chat stream with 30 initial messages
      const initialPool: ChatMessageItem[] = [];
      for (let i = 0; i < 30; i++) {
        const userIndex = i % simulatedUsers.length;
        const user = simulatedUsers[userIndex];
        const msgIndex = (msgPointerRef.current[user.id] || 0) % user.messages.length;
        msgPointerRef.current[user.id] = msgIndex + 1;

        initialPool.push({
          id: `sim-init-${i}-${Date.now()}`,
          username: user.username,
          badgeType: user.badgeType,
          levelBadge: user.levelBadge,
          extraIcon: user.extraIcon,
          text: user.messages[msgIndex],
          createdAt: new Date(Date.now() - (30 - i) * 2000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      }

      // Fetch persistent MongoDB messages
      try {
        const res = await fetch("/api/chat/messages");
        const data = await res.json();
        if (data.success && Array.isArray(data.messages)) {
          const dbMsgs: ChatMessageItem[] = data.messages.map((m: any) => ({
            id: m._id || `db-${Math.random()}`,
            username: m.username,
            badgeType: "gold_star",
            levelBadge: "VIP",
            text: m.text,
            isUser: true,
            createdAt: new Date(m.createdAt || Date.now()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));

          if (isMounted) {
            setMessages([...initialPool, ...dbMsgs]);
          }
        } else if (isMounted) {
          setMessages(initialPool);
        }
      } catch (err) {
        if (isMounted) setMessages(initialPool);
      }
    };

    if (isOpen) {
      initChatFeed();
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, simulatedUsers]);

  // 2. Stream Simulated Messages Every 1.1 Seconds (30% Faster Speed)
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const nextUserIdx = userPointerRef.current % simulatedUsers.length;
      userPointerRef.current += 1;
      const user = simulatedUsers[nextUserIdx];

      const currentMsgIdx = msgPointerRef.current[user.id] || 0;
      const text = user.messages[currentMsgIdx % user.messages.length];
      msgPointerRef.current[user.id] = currentMsgIdx + 1;

      const newMsgItem: ChatMessageItem = {
        id: `sim-live-${Date.now()}-${Math.random()}`,
        username: user.username,
        badgeType: user.badgeType,
        levelBadge: user.levelBadge,
        extraIcon: user.extraIcon,
        text: text,
        createdAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => {
        // Keep max 100 messages in DOM for smooth performance
        const updated = [...prev, newMsgItem];
        if (updated.length > 100) {
          return updated.slice(updated.length - 100);
        }
        return updated;
      });

      // Randomly fluctuate online counter
      setOnlineCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 1100);

    return () => clearInterval(interval);
  }, [isOpen, simulatedUsers]);

  // 3. Auto-scroll to bottom on new message
  useEffect(() => {
    if (isOpen && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // 4. Send Message Handler (Saves to MongoDB + Adds to Feed)
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const messageText = inputText.trim();
    setInputText("");

    const newMsgObj: ChatMessageItem = {
      id: `user-${Date.now()}`,
      username: "You",
      badgeType: "gold_star",
      levelBadge: "VIP",
      text: messageText,
      isUser: true,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add locally for instant UI response
    setMessages((prev) => [...prev, newMsgObj]);

    // Save to MongoDB Database
    try {
      await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "You",
          text: messageText,
          badge: "⭐",
          badgeType: "gold_star",
        }),
      });
    } catch (err) {
      console.error("Failed to save chat message to DB:", err);
    }
  };

  // Helper to parse @mentions like @Sierrsssen or @AndreaMT into highlighted pills
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(@[A-Za-z0-9_]+)/g);

    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <span
            key={index}
            className="inline-block bg-[#3b566b] text-[#b9cee0] hover:text-white px-1.5 py-0.5 rounded text-[13px] font-semibold mx-0.5 cursor-pointer transition"
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Render User Badges (Star, Level, Cake, C-logo)
  const renderBadge = (item: ChatMessageItem) => {
    if (item.badgeType === "c_logo") {
      return (
        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#f39c12] text-white text-[10px] font-black mr-1 shrink-0">
          C
        </span>
      );
    }

    if (item.badgeType === "cyan_star") {
      return (
        <span className="inline-flex items-center gap-1 text-[#48dce8] text-[13px] font-bold mr-1 shrink-0">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {item.levelBadge && <span className="text-[11px] font-extrabold">{item.levelBadge}</span>}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 text-[#ffb52b] text-[13px] font-bold mr-1 shrink-0">
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        {item.levelBadge && <span className="text-[11px] font-extrabold">{item.levelBadge}</span>}
        {item.extraIcon && <span className="text-xs ml-0.5">{item.extraIcon}</span>}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end items-stretch p-0 sm:p-3 pointer-events-auto">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Chat Container Window */}
      <div className="relative w-full sm:max-w-[420px] bg-[#0f212e] shadow-2xl border-0 sm:border border-[#1e3444] rounded-none sm:rounded-xl flex flex-col h-full sm:h-[calc(100vh-24px)] z-10 overflow-hidden transition-all duration-300 animate-in slide-in-from-right">
        
        {/* ================= HEADER ================= */}
        <div className="bg-[#1a2c38] px-4 py-3 border-b border-[#213745] flex items-center justify-between shrink-0">
          
          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-2 text-white font-semibold text-sm hover:text-[#9bbbd0] transition"
            >
              <span className="text-base">🇬🇧</span>
              <span>{selectedLang}</span>
              <FiChevronDown size={16} className="text-[#a9c8df]" />
            </button>

            {langDropdown && (
              <div className="absolute top-full left-0 mt-2 w-36 bg-[#1a2c38] border border-[#2e4a5d] rounded-lg shadow-xl z-20 py-1">
                {["English", "Hindi", "Spanish", "German", "Portuguese"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangDropdown(false);
                    }}
                    className="block w-full text-left px-3 py-1.5 text-xs text-[#b9cee0] hover:bg-[#253f52] hover:text-white font-medium"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 text-[#a9c8df] hover:text-white hover:bg-[#253f52] rounded-lg transition"
            aria-label="Close Chat"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* ================= CHAT MESSAGES STREAM ================= */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-[#0d1d28] scrollbar-thin scrollbar-thumb-[#1e3444]">
          {messages.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border transition-all duration-300 transform translate-y-0 opacity-100 ${
                item.isUser
                  ? "bg-[#18364b] border-[#294c66]"
                  : "bg-[#162734] border-[#1e3444] hover:bg-[#1a2e3d]"
              }`}
            >
              {/* User Header */}
              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                {renderBadge(item)}
                <span className={`text-[14px] font-bold ${item.isUser ? "text-[#55ff32]" : "text-white"}`}>
                  {item.username}:
                </span>
              </div>

              {/* Message Content */}
              <div className="text-[14px] text-[#d3e3ee] font-normal leading-relaxed break-words">
                {renderMessageContent(item.text)}
              </div>
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* ================= FOOTER / INPUT CONTROL BAR ================= */}
        <div className="bg-[#142633] p-3 border-t border-[#1e3444] shrink-0 space-y-2.5">
          
          {/* Main Textarea / Input */}
          <div className="relative flex items-center bg-[#091722] border border-[#253e50] rounded-lg focus-within:border-[#1976df] transition overflow-hidden">
            <input
              type="text"
              placeholder="Type your message"
              value={inputText}
              maxLength={160}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-transparent px-3.5 py-3 text-sm text-white placeholder:text-[#6a879d] outline-none"
            />
            <button
              type="button"
              className="p-2.5 text-[#9bbbd0] hover:text-white transition"
              title="Add Emoji"
              onClick={() => setInputText((prev) => prev + " 😊")}
            >
              <span className="text-base">😋</span>
            </button>
          </div>

          {/* Footer Action Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#829eb2]">
            
            {/* Live Online Counter */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#20ed2a] inline-block animate-pulse" />
              <span>Online: {onlineCount.toLocaleString()}</span>
            </div>

            {/* Character Length */}
            <div className="text-[#829eb2] font-mono text-[11px]">
              {160 - inputText.length}
            </div>

            {/* Right Buttons: Options + Send */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-9 h-9 rounded-lg bg-[#203746] hover:bg-[#2b485b] text-[#a9c8df] hover:text-white flex items-center justify-center transition"
                title="Chat Options"
              >
                <FiList size={17} />
              </button>

              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`h-9 px-5 rounded-lg text-sm font-bold text-white transition-all shadow-md ${
                  inputText.trim()
                    ? "bg-[#1476df] hover:bg-[#2585ed] cursor-pointer active:scale-95"
                    : "bg-[#1f3749] text-[#5b788e] cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
