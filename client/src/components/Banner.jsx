export default function Banner() {
  return (
    <div style={{
      position: "relative", height: "92vh", display: "flex", alignItems: "center",
      justifyContent: "center", textAlign: "center",
      backgroundImage: "url('https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1800&q=80')",
      backgroundSize: "cover", backgroundPosition: "center",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7))" }} />

      <div style={{ position: "relative", zIndex: 1, padding: "0 1.5rem", maxWidth: "680px" }}>
        <p style={{ color: "#d4a853", letterSpacing: "0.4em", textTransform: "uppercase", fontSize: "0.65rem", fontFamily: "sans-serif", marginBottom: "1.2rem" }}>
          Handcrafted Luxury Fragrances
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 5.5rem)", color: "#f5f0e8", lineHeight: 1.1, marginBottom: "1.2rem", letterSpacing: "0.02em" }}>
          Explore Luxury <em>Scents</em>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", fontFamily: "sans-serif", fontWeight: 300, letterSpacing: "0.04em", marginBottom: "2.5rem", lineHeight: 1.8 }}>
          Rare ingredients. Timeless compositions.<br />Find your signature scent.
        </p>
        <a
          href="#products"
          style={{ display: "inline-block", border: "1px solid #d4a853", color: "#d4a853", padding: "0.85rem 2.5rem", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 500, textDecoration: "none", transition: "all 0.3s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#d4a853"; e.currentTarget.style.color = "#0a0a0a"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#d4a853"; }}
        >
          Shop Collection
        </a>
      </div>
    </div>
  );
}
