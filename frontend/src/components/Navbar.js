import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <div className="logo">🍎 Freshness AI</div>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
          <Link className={location.pathname === "/scanner" ? "active" : ""} to="/scanner">Scanner</Link>
          <Link className={location.pathname === "/upload" ? "active" : ""} to="/upload">Upload</Link>
          <Link className={location.pathname === "/about" ? "active" : ""} to="/about">About</Link>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          ☰
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setMenuOpen(false)}>
          ✕
        </div>

        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/scanner" onClick={() => setMenuOpen(false)}>Scanner</Link>
        <Link to="/upload" onClick={() => setMenuOpen(false)}>Upload</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
      </div>
    </>
  );
}

export default Navbar;