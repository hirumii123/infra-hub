import Link from "next/link";
import { Navbar } from "./components/molecules/Navbar";

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .hp-root { font-family: 'DM Sans', sans-serif; }
        .hp-root * { box-sizing: border-box; }

        .hp-page {
          min-height: 100vh;
          background: #0a0c14;
          color: #e2e8f0;
          overflow: hidden;
        }

        /* Ambient blobs */
        .hp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .hp-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(99,179,237,0.12) 0%, transparent 70%);
          top: -100px; left: -100px;
        }
        .hp-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%);
          top: 100px; right: -80px;
        }
        .hp-blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(37,211,102,0.07) 0%, transparent 70%);
          bottom: 100px; left: 30%;
        }

        /* Grid overlay */
        .hp-grid {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
        }

        .hp-hero {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 60px);
          padding: 60px 24px;
          text-align: center;
        }

        /* Badge */
        .hp-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(99,179,237,0.08);
          border: 1px solid rgba(99,179,237,0.18);
          border-radius: 20px;
          padding: 5px 14px;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(99,179,237,0.7);
          margin-bottom: 28px;
          animation: hp-fadein 0.6s ease both;
        }
        .hp-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #63b3ed;
          animation: hp-pulse 2s ease-in-out infinite;
        }
        @keyframes hp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.75)} }

        /* Heading */
        .hp-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0 0 16px;
          animation: hp-fadein 0.6s 0.1s ease both;
        }
        .hp-title-accent {
          background: linear-gradient(135deg, #63b3ed 0%, #a78bfa 50%, #48c78e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hp-sub {
          font-size: clamp(0.95rem, 2vw, 1.1rem);
          color: rgba(255,255,255,0.35);
          max-width: 440px;
          line-height: 1.7;
          margin: 0 0 48px;
          font-weight: 300;
          animation: hp-fadein 0.6s 0.2s ease both;
        }

        /* CTA buttons */
        .hp-cta-row {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center;
          animation: hp-fadein 0.6s 0.3s ease both;
        }
        .hp-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
          color: #fff; font-size: 0.875rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none; letter-spacing: 0.01em;
          box-shadow: 0 4px 20px rgba(99,102,241,0.3);
          transition: all 0.2s ease;
        }
        .hp-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.4); }

        .hp-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 24px; border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.65); font-size: 0.875rem; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none; letter-spacing: 0.01em;
          transition: all 0.2s ease;
        }
        .hp-btn-secondary:hover { background: rgba(255,255,255,0.08); color: #fff; border-color: rgba(255,255,255,0.18); transform: translateY(-1px); }

        /* Feature cards */
        .hp-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          max-width: 680px;
          width: 100%;
          margin-top: 64px;
          animation: hp-fadein 0.6s 0.4s ease both;
        }
        .hp-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 20px;
          text-align: left;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .hp-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: 16px;
          background: var(--card-glow);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .hp-card:hover::before { opacity: 1; }
        .hp-card:hover { border-color: rgba(255,255,255,0.12); transform: translateY(-2px); }

        .hp-card-icon {
          font-size: 1.4rem; margin-bottom: 10px; display: block;
        }
        .hp-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 0.9rem; font-weight: 700;
          color: #fff; margin-bottom: 4px;
        }
        .hp-card-desc {
          font-size: 0.75rem; color: rgba(255,255,255,0.28); line-height: 1.5;
        }
        .hp-card-arrow {
          position: absolute; top: 18px; right: 18px;
          font-size: 0.75rem; color: rgba(255,255,255,0.15);
          transition: all 0.2s;
        }
        .hp-card:hover .hp-card-arrow { color: rgba(255,255,255,0.4); transform: translate(2px, -2px); }

        /* Divider line */
        .hp-divider {
          width: 1px; height: 20px;
          background: rgba(255,255,255,0.1);
        }

        @keyframes hp-fadein {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="hp-root hp-page">
        {/* Background effects */}
        <div className="hp-blob hp-blob-1" />
        <div className="hp-blob hp-blob-2" />
        <div className="hp-blob hp-blob-3" />
        <div className="hp-grid" />

        <Navbar />

        <div className="hp-hero">

          {/* Badge */}
          <div className="hp-badge">
            <span className="hp-badge-dot" />
            PT. AINO Indonesia
          </div>

          {/* Heading */}
          <h1 className="hp-title">
            Selamat datang di<br />
            <span className="hp-title-accent">Infra Hub</span>
          </h1>

          <p className="hp-sub">
            Platform terpusat untuk monitoring dan pengiriman laporan vendor infrastruktur PT AINO Indonesia.
          </p>

          {/* CTA */}
          <div className="hp-cta-row">
            <Link href="/emailPage" className="hp-btn-primary">
              ✉ Kirim Email
            </Link>
            <div className="hp-divider" />
            <Link href="/whatsappPage" className="hp-btn-secondary">
              💬 Kirim WhatsApp
            </Link>
          </div>

          {/* Feature cards */}
          <div className="hp-cards">
            <Link href="/emailPage" className="hp-card" style={{ "--card-glow": "linear-gradient(135deg, rgba(99,102,241,0.06), transparent)" } as any}>
              <span className="hp-card-icon">✉️</span>
              <div className="hp-card-title">Email Zimbra</div>
              <div className="hp-card-desc">Jadwalkan pengiriman request laporan SLA & LogBook via email otomatis</div>
              <span className="hp-card-arrow">↗</span>
            </Link>

            <Link href="/whatsappPage" className="hp-card" style={{ "--card-glow": "linear-gradient(135deg, rgba(37,211,102,0.05), transparent)" } as any}>
              <span className="hp-card-icon">📱</span>
              <div className="hp-card-title">WhatsApp</div>
              <div className="hp-card-desc">Kirim pesan ke personal atau grup dengan jadwal pengiriman fleksibel</div>
              <span className="hp-card-arrow">↗</span>
            </Link>

            <Link href="/chatPage" className="hp-card" style={{ "--card-glow": "linear-gradient(135deg, rgba(99,179,237,0.05), transparent)" } as any}>
              <span className="hp-card-icon">💬</span>
              <div className="hp-card-title">Chat</div>
              <div className="hp-card-desc">Buka dan balas percakapan WhatsApp langsung dari browser</div>
              <span className="hp-card-arrow">↗</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}