import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { getProducts } from "../services/api";

const CATEGORIES = ["All", "Oriental", "Floral", "Woody", "Fresh"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(data => { setProducts(data); setFiltered(data); })
      .catch(() => setError("Failed to load products. Make sure the server is running."))
      .finally(() => setLoading(false));
  }, []);

  function filterBy(cat) {
    setActiveCategory(cat);
    setFiltered(cat === "All" ? products : products.filter(p => p.category === cat));
  }

  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh" }}>
      <Banner />

      {/* Collection section */}
      <section id="products" style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 2rem 6rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#d4a853", letterSpacing: "0.38em", textTransform: "uppercase", fontSize: "0.62rem", fontFamily: "sans-serif", marginBottom: "0.8rem" }}>
            Our Collection
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "#1a1a1a" }}>
            Signature Fragrances
          </h2>
          <div style={{ width: "36px", height: "1px", background: "#d4a853", margin: "1rem auto 0" }} />
        </div>

        {/* Category filter */}
        {!loading && !error && products.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => filterBy(cat)}
                style={{
                  padding: "0.45rem 1.2rem",
                  border: `1px solid ${activeCategory === cat ? "#1a1a1a" : "#ddd"}`,
                  background: activeCategory === cat ? "#1a1a1a" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#888",
                  fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase",
                  fontFamily: "sans-serif", cursor: "pointer", borderRadius: "20px",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && <Loader />}

        {error && (
          <div style={{ textAlign: "center", padding: "3rem", background: "#fff5f5", borderRadius: "6px", border: "1px solid #fcc" }}>
            <p style={{ color: "#c0392b", fontFamily: "sans-serif", fontSize: "0.9rem" }}>{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", fontFamily: "sans-serif", padding: "3rem" }}>
            No products in this category.
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "2rem" }}>
            {filtered.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{ background: "#0d0d0d", color: "#666", textAlign: "center", padding: "2rem", fontFamily: "sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
        <p style={{ color: "#e8d5b0", fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.1rem", fontWeight: 300, marginBottom: "0.5rem" }}>Luxe Scents</p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
}
