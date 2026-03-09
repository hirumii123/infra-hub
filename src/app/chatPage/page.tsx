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

interface Contact {
  id: string;
  name: string;
  number: string;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;
}

function formatTime(timestamp: number): string {
  if (!timestamp) return "";
  return new Date(timestamp * 1000).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function formatContactTime(timestamp: number): string {
  if (!timestamp) return "";
  const d = new Date(timestamp * 1000);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function MediaMessage({ messageId, chatId, type }: { messageId: string; chatId: string; type: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const fetchMedia = async () => {
    setLoading(true); setError(false);
    try {
      const res = await fetch(`/api/whatsapp/media?chatId=${chatId}&messageId=${messageId}`);
      const data = await res.json();
      if (data.status === "success") setSrc(data.data);
      else setError(true);
    } catch { setError(true); }
    finally { setLoading(false); }
  };

  const loadMedia = () => { if (!src && !loading) fetchMedia(); };
  useEffect(() => { if (type === "sticker") fetchMedia(); }, []); // eslint-disable-line

  const shimmer = <div style={{ width: 180, height: 120, borderRadius: 10, background: "rgba(255,255,255,0.06)", animation: "cp-pulse 1.4s ease-in-out infinite" }} />;
  const tapBtn = (icon: string, label: string) => (
    <button onClick={loadMedia} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "7px 12px", fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", cursor: "pointer" }}>
      <span>{icon}</span>{label}
    </button>
  );

  if (type === "sticker") {
    if (loading) return <div style={{ width: 80, height: 80, borderRadius: 8, background: "rgba(255,255,255,0.06)", animation: "cp-pulse 1.4s infinite" }} />;
    if (src) return <img src={src} alt="Stiker" style={{ width: 80, height: 80, objectFit: "contain" }} />;
    return <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>🎴 Stiker</span>;
  }
  if (type === "image") {
    if (!src && !loading) return tapBtn("🖼️", "Tap untuk lihat foto");
    if (loading) return shimmer;
    if (error) return <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>📷 Tidak tersedia</span>;
    if (src) return (
      <div>
        <img src={src} alt="Foto" onClick={() => setExpanded(!expanded)} style={{ borderRadius: 10, cursor: "pointer", objectFit: "cover", maxWidth: expanded ? "100%" : 200, maxHeight: expanded ? undefined : 160, transition: "all 0.2s" }} />
        {expanded && <a href={src} download="foto.jpg" style={{ display: "block", fontSize: "0.72rem", color: "#63b3ed", marginTop: 4 }}>⬇ Unduh foto</a>}
      </div>
    );
  }
  if (type === "video") {
    if (!src && !loading) return tapBtn("🎥", "Tap untuk lihat video");
    if (loading) return shimmer;
    if (error) return <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>🎥 Tidak tersedia</span>;
    if (src) return <video controls style={{ borderRadius: 10, maxWidth: 220, maxHeight: 160 }}><source src={src} /></video>;
  }
  if (type === "audio" || type === "ptt") {
    if (!src && !loading) return tapBtn(type === "ptt" ? "🎤" : "🎵", "Tap untuk putar audio");
    if (loading) return <div style={{ width: 180, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.06)", animation: "cp-pulse 1.4s infinite" }} />;
    if (error) return <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>🎵 Tidak tersedia</span>;
    if (src) return <audio controls style={{ maxWidth: 220 }}><source src={src} /></audio>;
  }
  if (type === "document") {
    if (!src && !loading) return tapBtn("📄", "Tap untuk lihat dokumen");
    if (loading) return <div style={{ width: 120, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)", animation: "cp-pulse 1.4s infinite" }} />;
    if (src) return (
      <a href={src} download="dokumen" style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(99,179,237,0.1)", border: "1px solid rgba(99,179,237,0.2)", borderRadius: 10, padding: "7px 12px", fontSize: "0.78rem", color: "#63b3ed", textDecoration: "none" }}>
        📄 Unduh dokumen
      </a>
    );
  }
  return <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>[{type}]</span>;
}

const LIMIT_STEP = 50;

export default function ChatPage() {
  const [waStatus, setWaStatus] = useState("disconnected");
  const [inputMode, setInputMode] = useState<"manual" | "contacts">("contacts");
  const [number, setNumber] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactSearch, setContactSearch] = useState("");
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);

  const [chatId, setChatId] = useState<string | null>(null);
  const [chatName, setChatName] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(LIMIT_STEP);
  const [hasMore, setHasMore] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const shouldAutoScroll = useRef(false);
  const prevScrollHeightRef = useRef<number>(0);
  const isLoadingMoreRef = useRef(false);

  useEffect(() => {
    fetch("/api/whatsapp/status").then(r => r.json()).then(d => setWaStatus(d.status)).catch(() => setWaStatus("error"));
  }, []);

  // Fetch contacts saat mode contacts aktif dan WA connected
  useEffect(() => {
    if (inputMode !== "contacts" || waStatus !== "connected" || chatId) return;
    setIsLoadingContacts(true);
    fetch("/api/whatsapp/chats")
      .then(r => r.json())
      .then(d => { if (d.status === "success") setContacts(d.data); })
      .catch(() => {})
      .finally(() => setIsLoadingContacts(false));
  }, [inputMode, waStatus, chatId]);

  useEffect(() => {
    if (isLoadingMoreRef.current) return;
    const container = messagesContainerRef.current;
    if (!container || prevScrollHeightRef.current === 0) return;
    const diff = container.scrollHeight - prevScrollHeightRef.current;
    if (diff > 0) container.scrollTop = diff;
    prevScrollHeightRef.current = 0;
  }, [messages]);

  useEffect(() => {
    if (shouldAutoScroll.current) { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); shouldAutoScroll.current = false; }
  }, [messages]);

  const fetchMessages = useCallback(async (id: string, showLoading = true, currentLimit = LIMIT_STEP, isLoadMore = false) => {
    if (showLoading) setIsLoadingMessages(true);
    if (isLoadMore) {
      setIsLoadingMore(true); isLoadingMoreRef.current = true;
      if (messagesContainerRef.current) prevScrollHeightRef.current = messagesContainerRef.current.scrollHeight;
    }
    try {
      const oldestTs = isLoadMore && messages.length > 0 ? messages[0].timestamp : null;
      const url = `/api/whatsapp/messages?chatId=${id}&limit=${currentLimit}` + (isLoadMore ? `&loadMore=true` : "") + (oldestTs ? `&beforeTimestamp=${oldestTs}` : "");
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "success") {
        if (showLoading && !isLoadMore) shouldAutoScroll.current = true;
        setMessages(data.data);
        setHasMore(data.hasMore ?? data.data.length >= currentLimit);
      }
    } catch (err) { console.error("Gagal ambil pesan:", err); }
    finally {
      if (showLoading) setIsLoadingMessages(false);
      if (isLoadMore) { setIsLoadingMore(false); isLoadingMoreRef.current = false; }
    }
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || !chatId) return;
    const handleScroll = () => {
      if (container.scrollTop <= 50 && hasMore && !isLoadingMoreRef.current) {
        const newLimit = limit + LIMIT_STEP;
        setLimit(newLimit);
        fetchMessages(chatId, false, newLimit, true);
      }
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [chatId, hasMore, limit, fetchMessages]);

  useEffect(() => {
    if (!chatId) return;
    pollingRef.current = setInterval(() => fetchMessages(chatId, false, limit), 3000);
    return () => { if (pollingRef.current) clearInterval(pollingRef.current); };
  }, [chatId, limit, fetchMessages]);

  const openChat = async (id: string, name: string) => {
    setError("");
    setLimit(LIMIT_STEP); setHasMore(true);
    setChatId(id); setChatName(name); setMessages([]);
    await fetchMessages(id, true, LIMIT_STEP);
  };

  const handleOpenManual = async () => {
    setError("");
    const input = number.trim();
    if (!input) return;
    let digits = input.replace(/\D/g, "");
    if (digits.startsWith("0")) digits = "62" + digits.slice(1);
    await openChat(digits + "@c.us", input);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !chatId) return;
    setIsSending(true);
    const tempMsg: Message = { id: "temp-" + Date.now(), body: newMessage, fromMe: true, timestamp: Math.floor(Date.now() / 1000), type: "chat", hasMedia: false };
    shouldAutoScroll.current = true;
    setMessages(prev => [...prev, tempMsg]);
    const msgToSend = newMessage;
    setNewMessage("");
    try {
      const res = await fetch("/api/whatsapp/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chatId, message: msgToSend }) });
      const data = await res.json();
      if (data.status !== "success") setError("Gagal kirim: " + data.error);
    } catch { setError("Error koneksi saat kirim pesan"); }
    finally { setIsSending(false); }
  };

  const handleBack = () => {
    setChatId(null); setChatName(""); setMessages([]); setNumber("");
    setLimit(LIMIT_STEP); setHasMore(true);
    if (pollingRef.current) clearInterval(pollingRef.current);
  };

  const avatarColor = (name: string) => {
    const colors = ["#63b3ed","#68d391","#f6ad55","#fc8181","#b794f4","#76e4f7"];
    return colors[(name || "A").charCodeAt(0) % colors.length];
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
    c.number.includes(contactSearch)
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        .cp-root { font-family: 'DM Sans', sans-serif; }
        .cp-root * { box-sizing: border-box; }
        @keyframes cp-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes cp-spin { to{transform:rotate(360deg)} }
        @keyframes cp-fadein { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

        .cp-page { min-height: 100vh; background: #0a0c14; }

        .cp-warn { background: rgba(245,166,35,0.08); border-bottom: 1px solid rgba(245,166,35,0.15); padding: 8px 16px; font-size: 0.78rem; color: rgba(245,166,35,0.8); text-align: center; }
        .cp-warn a { color: #f5a623; font-weight: 700; text-decoration: underline; }

        .cp-shell { max-width: 700px; margin: 16px auto; height: calc(100vh - 100px); border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.07); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }

        /* ── Open screen ── */
        .cp-open-screen { flex: 1; background: #0d1020; display: flex; flex-direction: column; overflow: hidden; }

        .cp-open-header { background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 16px 20px; flex-shrink: 0; }
        .cp-open-header h2 { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; color: #fff; margin: 0 0 12px; }

        /* Mode toggle */
        .cp-mode-toggle { display: flex; gap: 0; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 3px; }
        .cp-mode-btn { flex: 1; padding: 7px 12px; border-radius: 8px; font-size: 0.78rem; font-weight: 600; font-family: 'DM Sans', sans-serif; border: none; cursor: pointer; transition: all 0.2s; color: rgba(255,255,255,0.35); background: transparent; }
        .cp-mode-btn.active { background: rgba(99,179,237,0.12); color: #63b3ed; border: 1px solid rgba(99,179,237,0.2); }
        .cp-mode-btn:hover:not(.active) { color: rgba(255,255,255,0.6); }

        /* Search bar */
        .cp-search-wrap { padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); flex-shrink: 0; }
        .cp-search-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 9px 14px 9px 36px; font-size: 0.855rem; font-family: 'DM Sans', sans-serif; color: #e2e8f0; outline: none; transition: border-color 0.2s; }
        .cp-search-input:focus { border-color: rgba(99,179,237,0.35); }
        .cp-search-input::placeholder { color: rgba(255,255,255,0.2); }
        .cp-search-icon { position: absolute; left: 26px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.25); pointer-events: none; }

        /* Contact list */
        .cp-contact-list { flex: 1; overflow-y: auto; }
        .cp-contact-list::-webkit-scrollbar { width: 3px; }
        .cp-contact-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 3px; }

        .cp-contact-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; cursor: pointer; transition: background 0.15s; border-bottom: 1px solid rgba(255,255,255,0.03); }
        .cp-contact-item:hover { background: rgba(255,255,255,0.04); }
        .cp-contact-avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; flex-shrink: 0; }
        .cp-contact-info { flex: 1; min-width: 0; }
        .cp-contact-name { font-size: 0.875rem; font-weight: 500; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cp-contact-last { font-size: 0.72rem; color: rgba(255,255,255,0.28); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cp-contact-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
        .cp-contact-time { font-size: 0.68rem; color: rgba(255,255,255,0.2); }
        .cp-unread-badge { background: #25d366; color: #fff; font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 10px; min-width: 18px; text-align: center; }

        /* Manual input panel */
        .cp-manual-panel { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 32px 24px; }
        .cp-manual-wrap { width: 100%; max-width: 340px; display: flex; flex-direction: column; gap: 10px; }
        .cp-manual-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: rgba(255,255,255,0.28); }
        .cp-manual-input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px 16px; font-size: 0.875rem; font-family: 'DM Sans', sans-serif; color: #e2e8f0; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .cp-manual-input:focus { border-color: rgba(99,179,237,0.45); box-shadow: 0 0 0 3px rgba(99,179,237,0.07); }
        .cp-manual-input::placeholder { color: rgba(255,255,255,0.18); }
        .cp-open-btn { width: 100%; padding: 12px; border-radius: 12px; border: none; cursor: pointer; background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); color: #fff; font-size: 0.875rem; font-weight: 600; font-family: 'DM Sans', sans-serif; box-shadow: 0 4px 20px rgba(37,211,102,0.2); transition: all 0.2s; }
        .cp-open-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(37,211,102,0.3); }
        .cp-open-btn:disabled { opacity: 0.3; cursor: not-allowed; box-shadow: none; background: rgba(255,255,255,0.08); }

        /* Empty / loading states */
        .cp-list-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 48px 16px; color: rgba(255,255,255,0.18); font-size: 0.82rem; text-align: center; }
        .cp-list-spinner { width: 22px; height: 22px; border: 2px solid rgba(255,255,255,0.06); border-top-color: rgba(99,179,237,0.4); border-radius: 50%; animation: cp-spin 0.8s linear infinite; }

        /* ── Chat view ── */
        .cp-chat-view { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #0d1020; }
        .cp-chat-header { background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 12px 16px; display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .cp-back-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: rgba(255,255,255,0.5); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
        .cp-back-btn:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .cp-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem; flex-shrink: 0; }
        .cp-chat-name { font-size: 0.875rem; font-weight: 600; color: #fff; }
        .cp-chat-num { font-size: 0.7rem; color: rgba(255,255,255,0.3); margin-top: 1px; }

        .cp-messages { flex: 1; min-height: 0; overflow-y: auto; padding: 16px 16px 8px; display: flex; flex-direction: column; gap: 4px; }
        .cp-messages::-webkit-scrollbar { width: 4px; }
        .cp-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

        .cp-bubble-wrap { display: flex; animation: cp-fadein 0.2s ease; }
        .cp-bubble-wrap.from-me { justify-content: flex-end; }
        .cp-bubble-wrap.from-them { justify-content: flex-start; }
        .cp-bubble { max-width: 72%; padding: 9px 12px; border-radius: 14px; font-size: 0.855rem; line-height: 1.5; word-break: break-word; white-space: pre-wrap; }
        .cp-bubble.from-me { background: linear-gradient(135deg, rgba(99,179,237,0.18), rgba(99,179,237,0.1)); border: 1px solid rgba(99,179,237,0.2); color: #e2e8f0; border-bottom-right-radius: 4px; }
        .cp-bubble.from-them { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); color: #cbd5e0; border-bottom-left-radius: 4px; }
        .cp-bubble-time { font-size: 0.65rem; margin-top: 4px; text-align: right; display: flex; align-items: center; justify-content: flex-end; gap: 3px; }
        .cp-bubble.from-me .cp-bubble-time { color: rgba(99,179,237,0.5); }
        .cp-bubble.from-them .cp-bubble-time { color: rgba(255,255,255,0.2); }

        .cp-loading-more { display: flex; justify-content: center; padding: 8px 0; }
        .cp-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.06); border-top-color: rgba(99,179,237,0.5); border-radius: 50%; animation: cp-spin 0.7s linear infinite; }
        .cp-end-label { display: flex; justify-content: center; padding: 6px 0; }
        .cp-end-pill { font-size: 0.68rem; color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); padding: 3px 12px; border-radius: 20px; }
        .cp-empty-msg { text-align: center; color: rgba(255,255,255,0.15); font-size: 0.85rem; padding: 40px 0; }

        .cp-error-bar { background: rgba(240,82,82,0.08); border-top: 1px solid rgba(240,82,82,0.15); padding: 8px 16px; font-size: 0.75rem; color: rgba(240,82,82,0.8); flex-shrink: 0; }

        .cp-input-bar { background: rgba(255,255,255,0.03); border-top: 1px solid rgba(255,255,255,0.06); padding: 10px 14px; display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .cp-msg-input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); border-radius: 22px; padding: 9px 16px; font-size: 0.875rem; font-family: 'DM Sans', sans-serif; color: #e2e8f0; outline: none; transition: border-color 0.2s; }
        .cp-msg-input:focus { border-color: rgba(99,179,237,0.35); }
        .cp-msg-input::placeholder { color: rgba(255,255,255,0.18); }
        .cp-send-btn { width: 38px; height: 38px; border-radius: 50%; border: none; cursor: pointer; background: linear-gradient(135deg, #25d366, #128c7e); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; box-shadow: 0 2px 12px rgba(37,211,102,0.25); }
        .cp-send-btn:hover:not(:disabled) { transform: scale(1.08); }
        .cp-send-btn:disabled { opacity: 0.3; cursor: not-allowed; background: rgba(255,255,255,0.08); box-shadow: none; }
      `}</style>

      <div className="cp-root cp-page">
        <Navbar />

        {waStatus !== "connected" && (
          <div className="cp-warn">
            ⚠ WhatsApp belum terhubung.{" "}
            <Link href="/whatsappPage">Hubungkan dulu</Link>
          </div>
        )}

        <div className="cp-shell">
          {!chatId ? (
            <div className="cp-open-screen">
              {/* Header + toggle */}
              <div className="cp-open-header">
                <h2>💬 Buka Chat</h2>
                <div className="cp-mode-toggle">
                  <button className={`cp-mode-btn ${inputMode === "contacts" ? "active" : ""}`} onClick={() => setInputMode("contacts")}>
                    👥 Pilih Kontak
                  </button>
                  <button className={`cp-mode-btn ${inputMode === "manual" ? "active" : ""}`} onClick={() => setInputMode("manual")}>
                    ✏️ Input Manual
                  </button>
                </div>
              </div>

              {/* Contacts mode */}
              {inputMode === "contacts" && (
                <>
                  <div className="cp-search-wrap" style={{ position: "relative" }}>
                    <svg className="cp-search-icon" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                    </svg>
                    <input
                      className="cp-search-input"
                      placeholder="Cari nama atau nomor..."
                      value={contactSearch}
                      onChange={e => setContactSearch(e.target.value)}
                    />
                  </div>
                  <div className="cp-contact-list">
                    {isLoadingContacts ? (
                      <div className="cp-list-empty">
                        <div className="cp-list-spinner" />
                        <span>Memuat kontak...</span>
                      </div>
                    ) : filteredContacts.length === 0 ? (
                      <div className="cp-list-empty">
                        <span style={{ fontSize: "1.5rem" }}>🔍</span>
                        <span>{contactSearch ? "Kontak tidak ditemukan" : "Tidak ada kontak"}</span>
                      </div>
                    ) : filteredContacts.map(c => (
                      <div key={c.id} className="cp-contact-item" onClick={() => openChat(c.id, c.name || c.number)}>
                        <div className="cp-contact-avatar" style={{ background: avatarColor(c.name) + "22", color: avatarColor(c.name), border: `1px solid ${avatarColor(c.name)}44` }}>
                          {(c.name || c.number).charAt(0).toUpperCase()}
                        </div>
                        <div className="cp-contact-info">
                          <div className="cp-contact-name">{c.name || c.number}</div>
                          <div className="cp-contact-last">{c.lastMessage || c.number}</div>
                        </div>
                        <div className="cp-contact-meta">
                          <span className="cp-contact-time">{formatContactTime(c.timestamp)}</span>
                          {c.unreadCount > 0 && <span className="cp-unread-badge">{c.unreadCount}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Manual mode */}
              {inputMode === "manual" && (
                <div className="cp-manual-panel">
                  <div className="cp-manual-wrap">
                    <label className="cp-manual-label">Nomor WhatsApp</label>
                    <input
                      className="cp-manual-input"
                      type="text"
                      placeholder="628123456789 atau 08123456789"
                      value={number}
                      onChange={e => setNumber(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleOpenManual()}
                    />
                    {error && <p style={{ fontSize: "0.75rem", color: "#fc8181", margin: 0 }}>{error}</p>}
                    <button className="cp-open-btn" onClick={handleOpenManual} disabled={!number.trim() || waStatus !== "connected"}>
                      Buka Chat
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── Chat View ── */
            <div className="cp-chat-view">
              <div className="cp-chat-header">
                <button className="cp-back-btn" onClick={handleBack}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="cp-avatar" style={{ background: avatarColor(chatName) + "22", color: avatarColor(chatName), border: `1px solid ${avatarColor(chatName)}44` }}>
                  {chatName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="cp-chat-name">{chatName}</div>
                  <div className="cp-chat-num">{chatId.replace("@c.us", "")}</div>
                </div>
              </div>

              <div className="cp-messages" ref={messagesContainerRef}>
                {isLoadingMore && <div className="cp-loading-more"><div className="cp-spinner" /></div>}
                {!hasMore && messages.length > 0 && <div className="cp-end-label"><span className="cp-end-pill">Tidak ada pesan lebih lama</span></div>}
                {isLoadingMessages ? (
                  <div className="cp-loading-more" style={{ flex: 1, alignItems: "center" }}>
                    <div className="cp-spinner" style={{ width: 24, height: 24 }} />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="cp-empty-msg">Belum ada pesan</div>
                ) : messages.map(msg => (
                  <div key={msg.id} className={`cp-bubble-wrap ${msg.fromMe ? "from-me" : "from-them"}`}>
                    <div className={`cp-bubble ${msg.fromMe ? "from-me" : "from-them"}`}>
                      {msg.hasMedia ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <MediaMessage messageId={msg.id} chatId={chatId!} type={msg.type} />
                          {msg.body && <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>{msg.body}</p>}
                        </div>
                      ) : <span>{msg.body}</span>}
                      <div className="cp-bubble-time">
                        {formatTime(msg.timestamp)}
                        {msg.fromMe && <span style={{ color: "rgba(99,179,237,0.6)" }}>✓✓</span>}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {error && <div className="cp-error-bar">{error}</div>}

              <div className="cp-input-bar">
                <input
                  className="cp-msg-input"
                  type="text"
                  placeholder="Ketik pesan..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                />
                <button className="cp-send-btn" onClick={handleSend} disabled={isSending || !newMessage.trim()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}