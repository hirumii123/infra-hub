"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Navbar } from "../components/molecules/Navbar";
import Link from "next/link";

interface Message {
  id: string;
  body: string;
  fromMe: boolean;
  timestamp: number;
  type: string;
  hasMedia: boolean;
}

function formatTime(timestamp: number): string {
  if (!timestamp) return "";
  return new Date(timestamp * 1000).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

// Komponen untuk render media (lazy load saat tampil)
function MediaMessage({ messageId, chatId, type }: { messageId: string; chatId: string; type: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/whatsapp/media?chatId=${chatId}&messageId=${messageId}`);
      const data = await res.json();
      if (data.status === "success") setSrc(data.data);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMedia = () => {
    if (!src && !loading) fetchMedia();
  };

  // Auto load stiker saat mount
  useEffect(() => {
    if (type === "sticker") fetchMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (type === "sticker") {
    if (loading) return <div className="w-20 h-20 bg-gray-100 rounded animate-pulse" />;
    if (src) return <img src={src} alt="Stiker" className="w-20 h-20 object-contain" />;
    return <span className="text-gray-400 text-xs">🎴 Stiker</span>;
  }

  if (type === "image") {
    if (!src && !loading) {
      return (
        <button
          onClick={loadMedia}
          className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 transition"
        >
          <span>🖼️</span> Tap untuk lihat foto
        </button>
      );
    }
    if (loading) return <div className="w-48 h-32 bg-gray-200 rounded-lg animate-pulse" />;
    if (error) return <span className="text-gray-400 text-xs">📷 Foto tidak tersedia</span>;
    if (src) return (
      <div>
        <img
          src={src}
          alt="Foto"
          className={`rounded-lg cursor-pointer object-cover transition-all ${expanded ? "max-w-full" : "max-w-xs max-h-48"}`}
          onClick={() => setExpanded(!expanded)}
        />
        {expanded && (
          <a href={src} download="foto.jpg" className="block text-xs text-blue-500 mt-1 hover:underline">
            ⬇ Unduh foto
          </a>
        )}
      </div>
    );
  }

  if (type === "video") {
    if (!src && !loading) {
      return (
        <button
          onClick={loadMedia}
          className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 transition"
        >
          <span>🎥</span> Tap untuk lihat video
        </button>
      );
    }
    if (loading) return <div className="w-48 h-32 bg-gray-200 rounded-lg animate-pulse" />;
    if (error) return <span className="text-gray-400 text-xs">🎥 Video tidak tersedia</span>;
    if (src) return (
      <video controls className="rounded-lg max-w-xs max-h-48 object-cover">
        <source src={src} />
      </video>
    );
  }

  if (type === "audio" || type === "ptt") {
    if (!src && !loading) {
      return (
        <button
          onClick={loadMedia}
          className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 transition"
        >
          <span>{type === "ptt" ? "🎤" : "🎵"}</span> Tap untuk putar audio
        </button>
      );
    }
    if (loading) return <div className="w-48 h-10 bg-gray-200 rounded-lg animate-pulse" />;
    if (error) return <span className="text-gray-400 text-xs">🎵 Audio tidak tersedia</span>;
    if (src) return <audio controls className="max-w-xs"><source src={src} /></audio>;
  }

  if (type === "document") {
    if (!src && !loading) {
      return (
        <button
          onClick={loadMedia}
          className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 transition"
        >
          <span>📄</span> Tap untuk lihat dokumen
        </button>
      );
    }
    if (loading) return <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />;
    if (src) return (
      <a href={src} download="dokumen" className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 text-sm text-blue-600 hover:bg-blue-100 transition">
        📄 Unduh dokumen
      </a>
    );
  }

  return <span className="text-gray-400 text-xs">[{type}]</span>;
}

export default function ChatPage() {
  const [waStatus, setWaStatus] = useState("disconnected");
  const [number, setNumber] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatName, setChatName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const isUserScrollingUp = useRef(false);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/whatsapp/status");
        const data = await res.json();
        setWaStatus(data.status);
      } catch {
        setWaStatus("error");
      }
    };
    check();
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      isUserScrollingUp.current = scrollHeight - scrollTop - clientHeight > 100;
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [chatId]);

  // ✅ shouldAutoScroll: hanya scroll saat buka chat pertama kali atau kirim pesan
  const shouldAutoScroll = useRef(false);
  useEffect(() => {
    if (shouldAutoScroll.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      shouldAutoScroll.current = false;
    }
  }, [messages]);

  const fetchMessages = useCallback(async (id: string, showLoading = true) => {
    if (showLoading) setIsLoadingMessages(true);
    try {
      const res = await fetch(`/api/whatsapp/messages?chatId=${id}`);
      const data = await res.json();
      if (data.status === "success") {
        // ✅ Hanya auto-scroll saat pertama buka chat (showLoading=true)
        if (showLoading) shouldAutoScroll.current = true;
        setMessages(data.data);
      }
    } catch (err) {
      console.error("Gagal ambil pesan:", err);
    } finally {
      if (showLoading) setIsLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (!chatId) return;
    pollingRef.current = setInterval(() => fetchMessages(chatId, false), 3000);
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [chatId, fetchMessages]);

  const handleOpenChat = async () => {
    setError("");
    const input = number.trim();
    if (!input) return;
    let digits = input.replace(/\D/g, "");
    if (digits.startsWith("0")) digits = "62" + digits.slice(1);
    const formattedId = digits + "@c.us";
    isUserScrollingUp.current = false;
    setChatId(formattedId);
    setChatName(input);
    setMessages([]);
    await fetchMessages(formattedId);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !chatId) return;
    setIsSending(true);
    const tempMsg: Message = {
      id: "temp-" + Date.now(),
      body: newMessage,
      fromMe: true,
      timestamp: Math.floor(Date.now() / 1000),
      type: "chat",
      hasMedia: false,
    };
    shouldAutoScroll.current = true;
    setMessages((prev) => [...prev, tempMsg]);
    const msgToSend = newMessage;
    setNewMessage("");
    try {
      const res = await fetch("/api/whatsapp/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, message: msgToSend }),
      });
      const data = await res.json();
      if (data.status !== "success") setError("Gagal kirim: " + data.error);
    } catch {
      setError("Error koneksi saat kirim pesan");
    } finally {
      setIsSending(false);
    }
  };

  const handleBack = () => {
    setChatId(null);
    setChatName("");
    setMessages([]);
    setNumber("");
    isUserScrollingUp.current = false;
    if (pollingRef.current) clearInterval(pollingRef.current);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {waStatus !== "connected" && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 text-sm text-yellow-800 text-center">
          ⚠️ WhatsApp belum terhubung.{" "}
          <Link href="/whatsappPage" className="underline font-bold">Hubungkan dulu</Link>
        </div>
      )}

      <div className="flex max-w-2xl mx-auto w-full shadow-xl my-6 rounded-xl overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>
        <div className="flex-1 flex flex-col bg-white overflow-hidden">
          {!chatId ? (
            <div className="flex flex-col h-full">
              <div className="bg-[#075E54] px-5 py-4 shrink-0">
                <h2 className="text-white font-bold text-lg">💬 Buka Chat</h2>
                <p className="text-green-200 text-xs mt-0.5">Masukkan nomor WhatsApp tujuan</p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
                <div className="w-24 h-24 rounded-full bg-[#ECE5DD] flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#075E54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="w-full max-w-sm space-y-3">
                  <label className="text-xs font-bold text-gray-500 block">Nomor WhatsApp</label>
                  <input
                    type="text"
                    placeholder="Contoh: 628123456789 atau 08123456789"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#075E54] focus:border-transparent"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleOpenChat()}
                  />
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  <button
                    onClick={handleOpenChat}
                    disabled={!number.trim() || waStatus !== "connected"}
                    className="w-full py-3 rounded-xl bg-[#075E54] hover:bg-[#064d45] disabled:bg-gray-300 text-white font-bold text-sm transition"
                  >
                    Buka Chat
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full bg-[#ECE5DD] overflow-hidden">
              {/* Header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 shadow shrink-0">
                <button onClick={handleBack} className="text-white hover:text-green-200 transition mr-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {chatName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{chatName}</p>
                  <p className="text-green-200 text-xs">{chatId?.replace("@c.us", "")}</p>
                </div>
              </div>

              {/* Pesan */}
              <div ref={messagesContainerRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-1.5">
                {isLoadingMessages ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin w-6 h-6 border-2 border-[#075E54] border-t-transparent rounded-full" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm py-10">Belum ada pesan</div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg shadow-sm text-sm ${
                        msg.fromMe ? "bg-[#DCF8C6] text-gray-800 rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"
                      }`}>
                        {/* Render media atau teks */}
                        {msg.hasMedia ? (
                          <div className="space-y-1">
                            <MediaMessage messageId={msg.id} chatId={chatId!} type={msg.type} />
                            {msg.body && <p className="text-xs text-gray-600 mt-1">{msg.body}</p>}
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap break-words">{msg.body}</p>
                        )}
                        <p className={`text-[10px] mt-1 text-right ${msg.fromMe ? "text-green-600" : "text-gray-400"}`}>
                          {formatTime(msg.timestamp)}
                          {msg.fromMe && <span className="ml-1">✓✓</span>}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {error && (
                <div className="bg-red-50 px-4 py-2 text-xs text-red-600 border-t border-red-100 shrink-0">{error}</div>
              )}

              {/* Input */}
              <div className="bg-white px-3 py-2 flex items-center gap-2 border-t border-gray-200 shrink-0">
                <input
                  type="text"
                  placeholder="Ketik pesan..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#075E54]"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                />
                <button
                  onClick={handleSend}
                  disabled={isSending || !newMessage.trim()}
                  className="w-10 h-10 rounded-full bg-[#075E54] hover:bg-[#064d45] disabled:bg-gray-300 flex items-center justify-center transition shrink-0"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}