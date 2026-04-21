import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Mini donut chart ─────────────────────── */
function DonutChart({ percent, color, size = 80 }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const t = setTimeout(() => setOffset(circ * (1 - percent / 100)), 300);
    return () => clearTimeout(t);
  }, [percent, circ]);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e8f5e9" strokeWidth="10" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  );
}

/* ─── Animated bar ─────────────────────────── */
function Bar({ label, percent, color, emoji }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(percent), 400);
    return () => clearTimeout(t);
  }, [percent]);

  return (
    <div style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text)", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>{emoji}</span>{label}
        </span>
        <span style={{ fontSize: "13px", fontWeight: "700", color }}>{percent}%</span>
      </div>
      <div style={{ height: "8px", background: "#e8f5e9", borderRadius: "20px", overflow: "hidden" }}>
        <div style={{
          height: "100%", background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          borderRadius: "20px", width: `${width}%`,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 8px ${color}66`,
        }} />
      </div>
    </div>
  );
}

/* ─── Stat Card ────────────────────────────── */
function StatCard({ emoji, value, label, sub, color, delay }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    if (isNaN(target)) return;
    let start = 0;
    const step = target / 40;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(id); }
        else setCount(Math.floor(start));
      }, 30);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);

  return (
    <div className="stat-card" style={{ "--accent": color }}>
      <div className="stat-emoji">{emoji}</div>
      <div className="stat-body">
        <div className="stat-value" style={{ color }}>
          {isNaN(target) ? value : count}{typeof value === "string" && value.includes("%") ? "%" : ""}
        </div>
        <div className="stat-label">{label}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
      <div className="stat-bg-circle" style={{ background: `${color}18` }} />
    </div>
  );
}

/* ─── Recent Scan Row ──────────────────────── */
function ScanRow({ food, result, conf, time, emoji }) {
  const isFresh = result === "Fresh";
  return (
    <div className="scan-row">
      <div className="scan-food">
        <span className="scan-emoji">{emoji}</span>
        <span className="scan-name">{food}</span>
      </div>
      <span className={`scan-badge ${isFresh ? "badge-fresh" : "badge-spoiled"}`}>
        {isFresh ? "✅" : "❌"} {result}
      </span>
      <span className="scan-conf">{conf}%</span>
      <span className="scan-time">{time}</span>
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

  const accuracy = [
    { label: "Fruits",      percent: 96, color: "#f97316", emoji: "🍊" },
    { label: "Vegetables",  percent: 94, color: "#16a34a", emoji: "🥦" },
    { label: "Berries",     percent: 91, color: "#dc2626", emoji: "🍓" },
    { label: "Root Veggies",percent: 88, color: "#f59e0b", emoji: "🥕" },
  ];

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

      {/* ── Stat Cards ── */}
      <div className="stats-row">
        <StatCard emoji="🔬" value="1248"    label="Total Scans"      sub="↑ 12% this week"  color="#16a34a" delay={0}   />
        <StatCard emoji="✅" value="94"      label="Accuracy Rate"    sub="Last 30 days"      color="#84cc16" delay={100} />
        <StatCard emoji="🚨" value="187"     label="Spoilage Alerts"  sub="Prevented waste"   color="#f97316" delay={200} />
        <StatCard emoji="⚡" value="48"      label="Avg Latency (ms)" sub="Real-time speed"   color="#fbbf24" delay={300} />
      </div>

      {/* ── Middle Grid ── */}
      <div className="dashboard-grid">

        {/* Accuracy chart */}
        <div className="card card-accuracy animate-fadeUp delay-2">
          <div className="card-header">
            <h3 className="card-title">📊 Detection Accuracy</h3>
            <span className="card-badge">By Category</span>
          </div>
          {accuracy.map((a) => (
            <Bar key={a.label} {...a} />
          ))}
          <div className="accuracy-footer">
            <div className="accuracy-donut">
              <DonutChart percent={94} color="#16a34a" size={90} />
              <div className="donut-label">
                <span className="donut-value">94%</span>
                <span className="donut-sub">Overall</span>
              </div>
            </div>
            <div className="accuracy-summary">
              <p>Model trained on <strong>50,000+</strong> food images across <strong>30 categories</strong>.</p>
              <p style={{ marginTop: "8px", color: "var(--text-muted)", fontSize: "12px" }}>Last updated: April 2025</p>
            </div>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="card card-scans animate-fadeUp delay-3">
          <div className="card-header">
            <h3 className="card-title">🕐 Recent Scans</h3>
            <span className="card-badge card-badge-orange">Live Feed</span>
          </div>
          <div className="scans-list">
            <div className="scan-row scan-header">
              <span>Food Item</span>
              <span>Result</span>
              <span>Conf.</span>
              <span>Time</span>
            </div>
            {recentScans.map((s, i) => <ScanRow key={i} {...s} />)}
          </div>
          <button className="view-all-btn" onClick={() => navigate("/upload")}>
            View All Scans →
          </button>
        </div>

        {/* Fresh vs Spoiled Donut */}
        <div className="card card-donut animate-fadeUp delay-4">
          <div className="card-header">
            <h3 className="card-title">🥗 Fresh vs Spoiled</h3>
            <span className="card-badge">Today</span>
          </div>
          <div className="donut-big-wrap">
            <div style={{ position: "relative", display: "inline-block" }}>
              <DonutChart percent={73} color="#16a34a" size={160} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "28px", fontWeight: "800", color: "#16a34a" }}>73%</span>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>FRESH</span>
              </div>
            </div>
          </div>
          <div className="donut-legend">
            <div className="legend-item">
              <span className="legend-dot" style={{ background: "#16a34a" }} />
              <span>Fresh (73%)</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: "#f97316" }} />
              <span>Spoiled (27%)</span>
            </div>
          </div>
          <div className="donut-tip">
            🌡️ Avg temp today: <strong>22°C</strong> — ideal conditions!
          </div>
        </div>
      </div>

      {/* ── Quick Action Cards ── */}
      <div className="quick-actions animate-fadeUp delay-5">
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
      <div className="tips-banner animate-fadeUp delay-5">
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

        /* ── Stats ── */
        .stats-row {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 28px;
        }
        .stat-card {
          background: white; border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 24px;
          display: flex; align-items: center; gap: 16px;
          position: relative; overflow: hidden;
          transition: var(--spring);
          box-shadow: var(--shadow-sm);
          animation: fadeUp 0.6s ease both;
        }
        .stat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .stat-emoji { font-size: 36px; flex-shrink: 0; }
        .stat-value { font-family: var(--font-display); font-size: 30px; font-weight: 800; line-height: 1; margin-bottom: 4px; }
        .stat-label { font-size: 13px; font-weight: 600; color: var(--text-2); }
        .stat-sub { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
        .stat-bg-circle {
          position: absolute; right: -20px; bottom: -20px;
          width: 80px; height: 80px; border-radius: 50%;
          pointer-events: none;
        }

        /* ── Dashboard Grid ── */
        .dashboard-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1.4fr 0.9fr;
          gap: 24px;
          margin-bottom: 28px;
        }

        /* ── Cards ── */
        .card {
          background: white; border: 1px solid var(--border);
          border-radius: var(--radius-lg); padding: 28px;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        .card:hover { box-shadow: var(--shadow-md); }
        .card-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 22px;
        }
        .card-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text); }
        .card-badge {
          background: #dcfce7; color: #166534;
          font-size: 11px; font-weight: 700;
          padding: 4px 10px; border-radius: 20px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .card-badge-orange { background: #fff7ed; color: #c2410c; }

        /* Accuracy footer */
        .accuracy-footer { display: flex; align-items: center; gap: 18px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); }
        .accuracy-donut { position: relative; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .donut-label { position: absolute; text-align: center; }
        .donut-value { display: block; font-family: var(--font-display); font-size: 18px; font-weight: 800; color: #16a34a; }
        .donut-sub { display: block; font-size: 10px; color: var(--text-muted); font-weight: 700; }
        .accuracy-summary { font-size: 13px; color: var(--text-2); line-height: 1.6; }

        /* Scans list */
        .scans-list { display: flex; flex-direction: column; gap: 2px; }
        .scan-row {
          display: grid; grid-template-columns: 1fr 120px 60px 90px;
          align-items: center; padding: 10px 12px;
          border-radius: var(--radius-sm);
          transition: var(--transition);
        }
        .scan-row:not(.scan-header):hover { background: #f0fdf4; }
        .scan-header { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; padding-bottom: 6px; border-bottom: 1px solid var(--border); margin-bottom: 4px; }
        .scan-food { display: flex; align-items: center; gap: 9px; }
        .scan-emoji { font-size: 20px; }
        .scan-name { font-size: 14px; font-weight: 600; color: var(--text); }
        .scan-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 20px; }
        .badge-fresh { background: #dcfce7; color: #166534; }
        .badge-spoiled { background: #fef2f2; color: #991b1b; }
        .scan-conf { font-size: 13px; font-weight: 700; color: var(--text-2); }
        .scan-time { font-size: 12px; color: var(--text-muted); }
        .view-all-btn {
          margin-top: 16px; width: 100%; padding: 10px;
          background: #f0fdf4; color: var(--fresh-green);
          border: 1px solid #bbf7d0; border-radius: var(--radius-sm);
          font-size: 13px; font-weight: 700;
          transition: var(--transition);
        }
        .view-all-btn:hover { background: var(--fresh-green); color: white; }

        /* Donut card */
        .donut-big-wrap { display: flex; justify-content: center; padding: 16px 0; }
        .donut-legend { display: flex; justify-content: center; gap: 24px; margin-bottom: 16px; }
        .legend-item { display: flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: var(--text-2); }
        .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .donut-tip { background: #fefce8; border: 1px solid #fde68a; border-radius: var(--radius-sm); padding: 10px 14px; font-size: 13px; color: #92400e; }

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

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .dashboard-grid { grid-template-columns: 1fr 1fr; }
          .card-donut { grid-column: 1 / -1; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .home-page { padding: 20px 16px 40px; }
          .hero-banner { flex-direction: column; padding: 32px 24px; gap: 32px; }
          .hero-visual { width: 220px; height: 220px; }
          .hero-title { font-size: 30px; }
          .dashboard-grid { grid-template-columns: 1fr; }
          .actions-grid { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
} 
