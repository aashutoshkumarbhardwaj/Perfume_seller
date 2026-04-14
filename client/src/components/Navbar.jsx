import { useState } from "react";
import { Link } from "react-router-dom";

const S = {
  nav: { background: "#0d0d0d", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 20px rgba(0,0,0,0.4)" },
  logo: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.25em", color: "#e8d5b0", textDecoration: "none" },
  links: { display: "flex", gap: "2.5rem", listStyle: "none" },
  link: { color: "#aaa", textDecoration: "none", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "sans-serif", transition: "color 0.2s" },
  hamburger: { display: "none", flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "4px" },
  bar: { width: "22px", height: "1px", background: "#fff", display: "block", transition: "all 0.3s" },
  mobileMenu: { position: "absolute", top: "64px", left: 0, right: 0, background: "#0d0d0d", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center", borderTop: "1px solid #222" },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  return (
    <nav style={S.nav}>
      <Link to="/" style={S.logo}>Luxe Scents</Link>

      <ul style={S.links} className="nav-desktop-links">
        {["Home", "Collection"].map((item) => (
          <li key={item}>
            <a
              href={item === "Home" ? "/" : "#products"}
              style={{ ...S.link, color: hovered === item ? "#d4a853" : "#aaa" }}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <button style={{ ...S.hamburger, display: "none" }} className="nav-hamburger" onClick={() => setOpen(!open)} aria-label="menu">
        <span style={S.bar} />
        <span style={{ ...S.bar, opacity: open ? 0 : 1 }} />
        <span style={S.bar} />
      </button>

      {open && (
        <div style={S.mobileMenu}>
          <Link to="/" style={S.link} onClick={() => setOpen(false)}>Home</Link>
          <a href="#products" style={S.link} onClick={() => setOpen(false)}>Collection</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
