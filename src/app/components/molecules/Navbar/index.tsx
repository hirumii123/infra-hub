"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [waStatus, setWaStatus] = useState<"disconnected" | "scanning" | "connected" | "authenticated" | "error">("disconnected");
  const router = useRouter();
  const pathname = usePathname();

  // Poll status WA setiap 5 detik
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/whatsapp/status");
        const data = await res.json();
        setWaStatus(data.status);
      } catch { setWaStatus("error"); }
    };
    check();
    const iv = setInterval(check, 5000);
    return () => clearInterval(iv);
  }, []);

  const isConnected = waStatus === "connected" || waStatus === "authenticated";

  const handleStartServer = async () => {
    if (isConnected) { router.push("/whatsappPage"); return; }
    setIsLoading(true);
    try {
      const response = await fetch("/api/whatsapp/connect", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Gagal mengaktifkan WhatsApp");
      router.push("/whatsappPage");
    } catch (err: any) {
      console.error("Detail Error:", err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const navLinks = [
    { href: "/emailPage", label: "Email", icon: "✉" },
    { href: "/whatsappPage", label: "WhatsApp", icon: "📱" },
    { href: "/chatPage", label: "Chat", icon: "💬" },
    { href: "/reportsPage", label: "Laporan", icon: "📥" },
    { href: "/settingsPage", label: "Pengaturan", icon: "⚙️" },

  ];

  // Style tombol berdasarkan status
  const btnStyle = isConnected
    ? { border: "1px solid rgba(72,199,142,0.35)", background: "rgba(72,199,142,0.1)", color: "#48c78e" }
    : isLoading
    ? { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)" }
    : { border: "1px solid rgba(72,199,142,0.35)", background: "rgba(72,199,142,0.1)", color: "#48c78e" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .navbar-root { font-family: 'DM Sans', sans-serif; }
        .navbar-logo { font-family: 'Syne', sans-serif; }

        .nav-glass {
          background: rgba(8, 10, 18, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s ease;
        }
        .nav-glass.scrolled {
          background: rgba(8, 10, 18, 0.97);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4);
        }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.5);
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 6px 14px;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
          text-decoration: none;
        }
        .nav-link:hover { color: rgba(255,255,255,0.95); background: rgba(255,255,255,0.06); }
        .nav-link.active { color: #fff; background: rgba(99,179,237,0.12); }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 14px; right: 14px;
          height: 2px;
          background: linear-gradient(90deg, #63b3ed, #a78bfa);
          border-radius: 2px;
        }

        .logo-mark {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px;
          background: linear-gradient(135deg, #63b3ed 0%, #a78bfa 100%);
          border-radius: 8px; font-size: 14px; font-weight: 800;
          color: #fff; font-family: 'Syne', sans-serif; flex-shrink: 0;
        }

        .wa-btn {
          position: relative;
          display: inline-flex; align-items: center; gap: 7px;
          padding: 7px 16px;
          font-size: 0.8rem; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.01em;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
          white-space: nowrap;
        }
        .wa-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(72, 199, 142, 0.2);
          filter: brightness(1.1);
        }
        .wa-btn:active:not(:disabled) { transform: translateY(0); }
        .wa-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .wa-dot {
          width: 7px; height: 7px; border-radius: 50%;
          flex-shrink: 0;
        }
        .wa-dot.green {
          background: #48c78e;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        .wa-dot.orange {
          background: #f5a623;
          animation: pulse-dot 1.2s ease-in-out infinite;
        }
        .wa-dot.grey { background: rgba(255,255,255,0.25); }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }

        .spinner {
          width: 12px; height: 12px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: currentColor;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .mobile-menu {
          position: absolute; top: 100%; left: 0; right: 0;
          background: rgba(8, 10, 18, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 12px 16px 16px;
          display: flex; flex-direction: column; gap: 4px;
          animation: slideDown 0.2s ease;
        }
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }

        .mobile-link {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 10px;
          color: rgba(255,255,255,0.55); font-size: 0.875rem; font-weight: 500;
          text-decoration: none; transition: all 0.15s;
        }
        .mobile-link:hover, .mobile-link.active { background: rgba(255,255,255,0.06); color: #fff; }
        .mobile-link-icon { font-size: 1rem; width: 24px; text-align: center; }

        .hamburger-btn {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px;
          background: transparent; border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6); cursor: pointer; transition: all 0.15s;
        }
        .hamburger-btn:hover { background: rgba(255,255,255,0.06); color: #fff; border-color: rgba(255,255,255,0.15); }
      `}</style>

      <nav className={`navbar-root nav-glass sticky top-0 z-50`}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", height: "60px", gap: "24px" }}>

            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
              <div className="logo-mark">I</div>
              <span className="navbar-logo" style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                InfraHub
              </span>
            </Link>

            <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.08)", flexShrink: 0 }} className="hidden sm:block" />

            {/* Desktop nav */}
            <div className="hidden sm:flex" style={{ alignItems: "center", gap: "2px", flex: 1 }}>
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? "active" : ""}`}>
                  <span style={{ marginRight: "5px", fontSize: "0.9em" }}>{link.icon}</span>{link.label}
                </Link>
              ))}
            </div>

            <div className="flex sm:hidden" style={{ flex: 1 }} />

            {/* WA Status Button */}
            <button onClick={handleStartServer} disabled={isLoading} className="wa-btn" style={btnStyle}>
              {isLoading ? (
                <><div className="spinner" /><span>Memproses...</span></>
              ) : isConnected ? (
                <><div className="wa-dot green" /><span>Terkoneksi</span></>
              ) : waStatus === "scanning" ? (
                <><div className="wa-dot orange" /><span>Scan QR...</span></>
              ) : (
                <><div className="wa-dot grey" /><span>Aktifkan WA</span></>
              )}
            </button>

            {/* Hamburger */}
            <button className="hamburger-btn sm:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu sm:hidden">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={`mobile-link ${pathname === link.href ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="mobile-link-icon">{link.icon}</span>{link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};