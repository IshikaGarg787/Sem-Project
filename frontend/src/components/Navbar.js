import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const navItems = [
  { path: "/",        label: "Dashboard", icon: "🏠" },
  { path: "/scanner", label: "Live Scan",  icon: "📷" },
  { path: "/upload",  label: "Upload",     icon: "📤" },
  { path: "/about",   label: "About",      icon: "🌿" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-icon">🥬</div>
          <span className="logo-text">FreshScan</span>
        </div>

        {/* Desktop Links */}
        <div className="nav-links">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={location.pathname === path ? "active" : ""}
            >
              <span className="nav-icon">{icon}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="nav-right">
          {/* Hamburger */}
          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`sidebar-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">🥬 FreshScan</span>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={location.pathname === path ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              <span style={{ fontSize: "20px" }}>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-food-art">🍎🥦🍋🫐🥕</div>
      </div>
    </>
  );
}

export default Navbar;
