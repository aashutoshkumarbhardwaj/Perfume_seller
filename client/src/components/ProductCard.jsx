import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/product/${product._id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: "none", display: "flex", flexDirection: "column",
        background: "#fff", borderRadius: "6px", overflow: "hidden",
        boxShadow: hovered ? "0 24px 64px rgba(0,0,0,0.13)" : "0 2px 16px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "300px", overflow: "hidden", background: "#f0ece4" }}>
        <img
          src={product.images?.[0]}
          alt={product.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.55s ease",
          }}
        />
        {/* Category badge */}
        <span style={{
          position: "absolute", top: "1rem", left: "1rem",
          background: "rgba(0,0,0,0.55)", color: "#d4a853",
          fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase",
          fontFamily: "sans-serif", padding: "0.3rem 0.7rem", borderRadius: "2px",
          backdropFilter: "blur(4px)",
        }}>
          {product.category}
        </span>
        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered ? "rgba(10,10,10,0.38)" : "rgba(10,10,10,0)",
          transition: "background 0.35s ease",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            color: "#fff", fontSize: "0.62rem", letterSpacing: "0.28em",
            textTransform: "uppercase", fontFamily: "sans-serif",
            border: "1px solid rgba(255,255,255,0.75)", padding: "0.55rem 1.4rem",
            opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}>
            View Details
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "1.3rem 1.5rem 1.6rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1.25rem", fontWeight: 400, color: "#1a1a1a", marginBottom: "0.4rem",
        }}>
          {product.name}
        </h3>
        <p style={{
          color: "#999", fontSize: "0.8rem", lineHeight: 1.65, fontFamily: "sans-serif",
          flex: 1, marginBottom: "1rem",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {product.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1a1a1a", fontFamily: "sans-serif" }}>
            ${product.price?.toFixed(2)}
          </span>
          <span style={{
            fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase",
            fontFamily: "sans-serif", color: hovered ? "#d4a853" : "#bbb",
            transition: "color 0.3s",
          }}>
            Shop →
          </span>
        </div>
      </div>
    </Link>
  );
}
