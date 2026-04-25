import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Recent Scan Row ──────────────────────── */
function ScanRow({ food, result, conf, time, emoji, index }) {
  const isFresh = result === "Fresh";
  return (
    <div className="scan-row" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="scan-food">
        <div className="scan-emoji-wrap">{emoji}</div>
        <div>
          <span className="scan-name">{food}</span>
        </div>
      </div>
      <span className={`scan-badge ${isFresh ? "badge-fresh" : "badge-spoiled"}`}>
        {isFresh ? "✅" : "❌"} {result}
      </span>
      <div className="conf-wrap">
        <div className="conf-bar-bg">
          <div
            className="conf-bar-fill"
            style={{
              width: `${conf}%`,
              background: isFresh
                ? "linear-gradient(90deg, #16a34a, #4ade80)"
                : "linear-gradient(90deg, #ef4444, #f97316)",
            }}
          />
        </div>
        <span className="scan-conf">{conf}%</span>
      </div>
      <span className="scan-time">🕐 {time}</span>
    </div>
  );
}

/* ─── Main Component ───────────────────────── */
export default function Home() {
  const navigate = useNavigate();

  const recentScans = [
    { food: "Apple",      result: "Fresh",   conf: 97, time: "2 min ago",  emoji: "🍎" },
    { food: "Tomato",     result: "Spoiled",  conf: 89, time: "8 min ago",  emoji: "🍅" },
    { food: "Broccoli",   result: "Fresh",   conf: 94, time: "15 min ago", emoji: "🥦" },
    { food: "Banana",     result: "Fresh",   conf: 91, time: "22 min ago", emoji: "🍌" },
    { food: "Strawberry", result: "Spoiled",  conf: 85, time: "1 hr ago",   emoji: "🍓" },
  ];

  const freshCount = recentScans.filter(s => s.result === "Fresh").length;
  const spoiledCount = recentScans.length - freshCount;

  return (
    <div className="home-page">

      {/* ── Floating background orbs ── */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      {/* ── Hero Banner ── */}
      <div className="hero-banner animate-fadeUp">
        <div className="hero-content">
          <div className="hero-tag">🌿 AI-Powered Freshness Analysis</div>
          <h1 className="hero-title">
            Know Your Food.<br />
            <span className="hero-title-accent">Stay Fresh. Stay Safe.</span>
          </h1>
          <p className="hero-desc">
            Upload or scan any fruit or vegetable — our deep learning model combined
            with sensor fusion delivers instant freshness predictions you can trust.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/scanner")}>
              <span>📷</span> Start Live Scan
            </button>
            <button className="btn-secondary" onClick={() => navigate("/upload")}>
              <span>📤</span> Upload Image
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-ring hero-ring-1" />
          <div className="hero-ring hero-ring-2" />
          <div className="hero-ring hero-ring-3" />
          <div className="food-orbit">
            {["🍎","🥦","🍋","🥕","🍇","🌽","🍓","🥑"].map((f, i) => (
              <div key={i} className="orbit-item" style={{ "--i": i, "--total": 8 }}>{f}</div>
            ))}
          </div>
          <div className="hero-center-icon">🥬</div>
        </div>
      </div>

      {/* ── Recent Scans — Full Width ── */}
      <div className="scans-section animate-fadeUp delay-2">
        {/* Section header */}
        <div className="scans-section-header">
          <div>
            <h2 className="scans-section-title">🕐 Recent Scans</h2>
            <p className="scans-section-sub">Live feed of your latest freshness checks</p>
          </div>
          <div className="scans-stats">
            <div className="stat-pill stat-fresh">
              <span className="stat-pill-dot" style={{ background: "#16a34a" }} />
              <span>{freshCount} Fresh</span>
            </div>
            <div className="stat-pill stat-spoiled">
              <span className="stat-pill-dot" style={{ background: "#ef4444" }} />
              <span>{spoiledCount} Spoiled</span>
            </div>
            <div className="live-indicator">
              <span className="live-dot" />
              LIVE
            </div>
          </div>
        </div>

        {/* Table card */}
        <div className="scans-card">
          <div className="scans-table-header">
            <span>Food Item</span>
            <span>Result</span>
            <span>Confidence</span>
            <span>Time</span>
          </div>
          <div className="scans-list">
            {recentScans.map((s, i) => <ScanRow key={i} index={i} {...s} />)}
          </div>
          <div className="scans-footer">
            <button className="view-all-btn" onClick={() => navigate("/upload")}>
              View All Scans →
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Action Cards ── */}
      <div className="quick-actions animate-fadeUp delay-3">
        <h2 className="section-title">⚡ Quick Actions</h2>
        <div className="actions-grid">
          {[
            { icon: "📷", label: "Live Scanner",  desc: "Real-time camera detection",   color: "#16a34a", path: "/scanner" },
            { icon: "📤", label: "Upload Photo",  desc: "Analyze any saved image",       color: "#2563eb", path: "/upload"  },
            { icon: "🌿", label: "About Project", desc: "Learn how FreshScan works",     color: "#8b5cf6", path: "/about"   },
          ].map(({ icon, label, desc, color, path }) => (
            <div key={path} className="action-card" style={{ "--c": color }} onClick={() => navigate(path)}>
              <div className="action-icon" style={{ background: `${color}18`, color }}>{icon}</div>
              <div>
                <div className="action-label">{label}</div>
                <div className="action-desc">{desc}</div>
              </div>
              <div className="action-arrow">→</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Freshness Tips Banner ── */}
      <div className="tips-banner animate-fadeUp delay-4">
        <div className="tips-inner">
          <span className="tips-title">💡 Freshness Tips</span>
          <div className="tips-scroll">
            {["🍎 Store apples in the fridge to extend shelf life by 2–4 weeks",
              "🥦 Broccoli stays fresh longest at 0°C with high humidity",
              "🍋 Citrus fruits last up to 6 weeks when refrigerated",
              "🥕 Remove carrot tops before storing — they draw moisture from roots",
              "🍓 Never wash berries until you're ready to eat them",
            ].map((tip, i) => (
              <span key={i} className="tip-item">{tip}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ── Page Base ── */
        .home-page {
          padding: 32px 40px 60px;
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Background Orbs ── */
        .bg-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }
        .bg-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, #bbf7d0, transparent); top: -100px; right: -100px; animation: blob 10s ease-in-out infinite; }
        .bg-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, #fef9c3, transparent); bottom: 200px; left: -80px; animation: blob 13s ease-in-out infinite reverse; }
        .bg-orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, #fed7aa, transparent); top: 50%; right: 20%; animation: blob 9s ease-in-out infinite 2s; }

        /* ── Hero ── */
        .hero-banner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 40%, #fefce8 100%);
          border: 1px solid #bbf7d0;
          border-radius: 28px;
          padding: 52px 60px;
          margin-bottom: 32px;
          overflow: hidden;
        }
        .hero-banner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        .hero-content { flex: 1; max-width: 540px; position: relative; z-index: 1; }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: white; border: 1px solid #bbf7d0;
          padding: 6px 16px; border-radius: 50px;
          font-size: 12px; font-weight: 700;
          color: var(--fresh-green); letter-spacing: 0.3px;
          margin-bottom: 20px;
          box-shadow: var(--shadow-sm);
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: 42px; font-weight: 900;
          line-height: 1.15; color: var(--text);
          margin-bottom: 18px;
          letter-spacing: -1px;
        }
        .hero-title-accent {
          background: linear-gradient(135deg, #16a34a, #84cc16, #f97316);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-desc {
          font-size: 15px; color: var(--text-2); line-height: 1.75;
          margin-bottom: 32px; max-width: 440px;
        }
        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }

        /* Buttons */
        .btn-primary {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 28px; font-size: 15px; font-weight: 700;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white; border: none; border-radius: 50px;
          box-shadow: 0 6px 20px rgba(22,163,74,0.4);
          transition: var(--spring);
        }
        .btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 30px rgba(22,163,74,0.5); }
        .btn-secondary {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 28px; font-size: 15px; font-weight: 700;
          background: white; color: var(--text);
          border: 2px solid var(--border); border-radius: 50px;
          box-shadow: var(--shadow-sm);
          transition: var(--spring);
        }
        .btn-secondary:hover { transform: translateY(-3px); border-color: var(--fresh-green); color: var(--fresh-green); box-shadow: var(--shadow-md); }

        /* ── Hero Visual / Orbit ── */
        .hero-visual {
          position: relative; width: 320px; height: 320px;
          flex-shrink: 0; display: flex; align-items: center; justify-content: center;
        }
        .hero-ring {
          position: absolute; border-radius: 50%; border: 1.5px dashed;
          animation: spin-slow linear infinite;
        }
        .hero-ring-1 { width: 300px; height: 300px; border-color: rgba(22,163,74,0.2); animation-duration: 20s; }
        .hero-ring-2 { width: 220px; height: 220px; border-color: rgba(132,204,22,0.25); animation-duration: 15s; animation-direction: reverse; }
        .hero-ring-3 { width: 140px; height: 140px; border-color: rgba(249,115,22,0.2); animation-duration: 10s; }

        .food-orbit {
          position: absolute; width: 300px; height: 300px;
          animation: spin-slow 20s linear infinite;
        }
        .orbit-item {
          position: absolute;
          top: 50%; left: 50%;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          transform-origin: -110px 0;
          transform: rotate(calc(var(--i) * (360deg / var(--total)))) translateX(110px);
          animation: spin-slow 20s linear infinite reverse;
          animation-duration: 20s;
        }
        .hero-center-icon {
          position: relative; z-index: 2;
          font-size: 64px;
          filter: drop-shadow(0 8px 20px rgba(22,163,74,0.3));
          animation: float 4s ease-in-out infinite;
        }

        /* ── Recent Scans Section ── */
        .scans-section {
          position: relative; z-index: 1;
          margin-bottom: 28px;
        }
        .scans-section-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .scans-section-title {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 800;
          color: var(--text); margin: 0 0 4px;
        }
        .scans-section-sub {
          font-size: 13px; color: var(--text-muted);
          margin: 0;
        }
        .scans-stats {
          display: flex; align-items: center; gap: 10px;
        }
        .stat-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 50px;
          font-size: 13px; font-weight: 700;
        }
        .stat-fresh { background: #dcfce7; color: #166534; }
        .stat-spoiled { background: #fef2f2; color: #991b1b; }
        .stat-pill-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .live-indicator {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 50px;
          background: #fff7ed; color: #c2410c;
          font-size: 11px; font-weight: 800;
          letter-spacing: 1px;
          border: 1px solid #fed7aa;
        }
        .live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #f97316;
          animation: pulse-dot 1.5s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }

        .scans-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          transition: var(--transition);
        }
        .scans-card:hover { box-shadow: var(--shadow-md); }

        .scans-table-header {
          display: grid;
          grid-template-columns: 1fr 160px 220px 140px;
          padding: 14px 28px;
          background: #f8fafc;
          border-bottom: 1px solid var(--border);
          font-size: 11px; font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase; letter-spacing: 0.8px;
        }

        .scans-list { display: flex; flex-direction: column; padding: 8px 0; }

        .scan-row {
          display: grid;
          grid-template-columns: 1fr 160px 220px 140px;
          align-items: center;
          padding: 14px 28px;
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.15s ease;
          animation: fadeInRow 0.4s ease both;
        }
        @keyframes fadeInRow {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .scan-row:last-child { border-bottom: none; }
        .scan-row:hover { background: #f0fdf4; }

        .scan-food { display: flex; align-items: center; gap: 12px; }
        .scan-emoji-wrap {
          width: 40px; height: 40px;
          background: #f0fdf4;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          border: 1px solid #dcfce7;
        }
        .scan-name { font-size: 15px; font-weight: 600; color: var(--text); }

        .scan-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 700;
          padding: 6px 14px; border-radius: 20px;
          width: fit-content;
        }
        .badge-fresh  { background: #dcfce7; color: #166534; }
        .badge-spoiled { background: #fef2f2; color: #991b1b; }

        .conf-wrap {
          display: flex; align-items: center; gap: 10px;
        }
        .conf-bar-bg {
          flex: 1; height: 7px; background: #f1f5f9;
          border-radius: 20px; overflow: hidden;
          max-width: 140px;
        }
        .conf-bar-fill {
          height: 100%; border-radius: 20px;
          transition: width 1s ease;
        }
        .scan-conf {
          font-size: 13px; font-weight: 700;
          color: var(--text-2); min-width: 36px;
        }
        .scan-time {
          font-size: 13px; color: var(--text-muted);
          display: flex; align-items: center; gap: 4px;
        }

        .scans-footer {
          padding: 16px 28px;
          border-top: 1px solid var(--border);
          background: #fafafa;
        }
        .view-all-btn {
          width: 100%; padding: 11px;
          background: #f0fdf4; color: var(--fresh-green);
          border: 1px solid #bbf7d0; border-radius: var(--radius-sm);
          font-size: 13px; font-weight: 700;
          transition: var(--transition);
        }
        .view-all-btn:hover { background: var(--fresh-green); color: white; }

        /* ── Quick Actions ── */
        .quick-actions { position: relative; z-index: 1; margin-bottom: 28px; }
        .section-title { font-family: var(--font-display); font-size: 22px; font-weight: 800; color: var(--text); margin-bottom: 16px; }
        .actions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .action-card {
          display: flex; align-items: center; gap: 16px;
          background: white; border: 1px solid var(--border);
          border-radius: var(--radius-md); padding: 20px 24px;
          cursor: pointer; transition: var(--spring);
          box-shadow: var(--shadow-sm);
        }
        .action-card:hover { transform: translateY(-4px) scale(1.01); box-shadow: var(--shadow-md); border-color: var(--c); }
        .action-icon { font-size: 28px; width: 52px; height: 52px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: var(--spring); }
        .action-card:hover .action-icon { transform: scale(1.15) rotate(5deg); }
        .action-label { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
        .action-desc { font-size: 12px; color: var(--text-muted); }
        .action-arrow { margin-left: auto; font-size: 20px; color: var(--text-muted); transition: var(--transition); }
        .action-card:hover .action-arrow { transform: translateX(4px); color: var(--c); }

        /* ── Tips Banner ── */
        .tips-banner {
          position: relative; z-index: 1;
          background: linear-gradient(135deg, #166534, #15803d, #16a34a);
          border-radius: var(--radius-lg); padding: 18px 28px;
          overflow: hidden;
        }
        .tips-inner { display: flex; align-items: center; gap: 20px; }
        .tips-title { font-size: 13px; font-weight: 800; color: #86efac; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; }
        .tips-scroll { display: flex; gap: 40px; overflow: hidden; mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent); }
        .tip-item {
          font-size: 13px; color: white; white-space: nowrap;
          animation: scrollTips 25s linear infinite;
          font-weight: 500;
        }
        @keyframes scrollTips {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        /* ── Animations ── */
        .animate-fadeUp { animation: fadeUp 0.6s ease both; }
        .delay-2 { animation-delay: 0.1s; }
        .delay-3 { animation-delay: 0.2s; }
        .delay-4 { animation-delay: 0.3s; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(20px,-20px) scale(1.05); }
          66%      { transform: translate(-15px,10px) scale(0.96); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .scans-table-header,
          .scan-row {
            grid-template-columns: 1fr 130px 1fr;
          }
          .scan-row > .scan-time,
          .scans-table-header > span:last-child { display: none; }
        }
        @media (max-width: 768px) {
          .home-page { padding: 20px 16px 40px; }
          .hero-banner { flex-direction: column; padding: 32px 24px; gap: 32px; }
          .hero-visual { width: 220px; height: 220px; }
          .hero-title { font-size: 30px; }
          .scans-table-header,
          .scan-row { grid-template-columns: 1fr 120px; padding: 12px 16px; }
          .scans-table-header span:nth-child(n+3),
          .scan-row > *:nth-child(n+3) { display: none; }
          .scans-section-header { flex-direction: column; align-items: flex-start; }
          .actions-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
