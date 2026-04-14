import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import ReviewForm from "../components/ReviewForm";
import { getProductById, getReviews } from "../services/api";

/* ── Star display ── */
function Stars({ rating, size = "1rem" }) {
  return (
    <span style={{ display: "inline-flex", gap: "1px" }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ fontSize: size, color: s <= rating ? "#d4a853" : "#ddd", lineHeight: 1 }}>★</span>
      ))}
    </span>
  );
}

/* ── Average rating bar ── */
function RatingBar({ reviews }) {
  if (!reviews.length) return null;
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  const counts = [5, 4, 3, 2, 1].map(n => ({ n, c: reviews.filter(r => r.rating === n).length }));
  return (
    <div style={{ background: "#f9f7f4", border: "1px solid #ede9e3", borderRadius: "6px", padding: "1.5rem 2rem", marginBottom: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.2rem" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "3.5rem", fontWeight: 300, color: "#1a1a1a", lineHeight: 1 }}>{avg.toFixed(1)}</p>
          <Stars rating={Math.round(avg)} size="1.1rem" />
          <p style={{ fontSize: "0.72rem", color: "#aaa", fontFamily: "sans-serif", marginTop: "0.3rem" }}>{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ flex: 1 }}>
          {counts.map(({ n, c }) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
              <span style={{ fontSize: "0.72rem", color: "#888", fontFamily: "sans-serif", width: "8px" }}>{n}</span>
              <span style={{ color: "#d4a853", fontSize: "0.75rem" }}>★</span>
              <div style={{ flex: 1, height: "6px", background: "#e8e4de", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${reviews.length ? (c / reviews.length) * 100 : 0}%`, background: "#d4a853", borderRadius: "3px", transition: "width 0.5s ease" }} />
              </div>
              <span style={{ fontSize: "0.72rem", color: "#aaa", fontFamily: "sans-serif", width: "16px" }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Share button with social icons ── */
function ShareSection() {
  const [copied, setCopied] = useState(false);
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  const socials = [
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${title}%20${url}`,
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
  ];

  return (
    <div>
      <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", fontFamily: "sans-serif", marginBottom: "0.7rem" }}>Share</p>
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
        {socials.map(s => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${s.label}`}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "38px", height: "38px", border: "1px solid #ddd",
              borderRadius: "50%", color: "#555", textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#d4a853"; e.currentTarget.style.color = "#d4a853"; e.currentTarget.style.background = "#fffbf2"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "transparent"; }}
          >
            {s.icon}
          </a>
        ))}
        <button
          onClick={() => { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            border: "1px solid #ddd", background: copied ? "#f0fff4" : "transparent",
            borderColor: copied ? "#9ae6b4" : "#ddd",
            padding: "0 0.9rem", height: "38px", borderRadius: "20px",
            fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase",
            fontFamily: "sans-serif", cursor: "pointer", color: copied ? "#276749" : "#555",
            transition: "all 0.2s",
          }}
        >
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
          </svg>
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}

/* ── Main page ── */
export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    Promise.all([getProductById(id), getReviews(id)])
      .then(([prod, revs]) => {
        setProduct(prod);
        setReviews(revs);
        setSelectedSize(prod.sizes?.[0] || null);
      })
      .catch(() => setError("Failed to load product."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p style={{ textAlign: "center", padding: "5rem", color: "#c0392b", fontFamily: "sans-serif" }}>{error}</p>;
  if (!product) return null;

  const avgRating = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;

  return (
    <div style={{ background: "#fafaf8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "2.5rem 2rem 5rem" }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: "0.75rem", color: "#bbb", fontFamily: "sans-serif", marginBottom: "2.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <Link to="/" style={{ color: "#bbb", textDecoration: "none" }}
            onMouseEnter={e => e.target.style.color = "#d4a853"}
            onMouseLeave={e => e.target.style.color = "#bbb"}>Home</Link>
          <span>›</span>
          <span style={{ color: "#888" }}>{product.category}</span>
          <span>›</span>
          <span style={{ color: "#1a1a1a" }}>{product.name}</span>
        </nav>

        {/* ── Product section ── */}
        <div className="product-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginBottom: "5rem", alignItems: "start" }}>

          {/* Gallery */}
          <div>
            {/* Main image */}
            <div style={{ position: "relative", height: "500px", overflow: "hidden", borderRadius: "6px", background: "#f0ece4", marginBottom: "0.9rem" }}>
              <img
                key={activeImg}
                src={product.images?.[activeImg]}
                alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", animation: "fadeIn 0.3s ease" }}
              />
            </div>
            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "0.7rem" }}>
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: "76px", height: "76px", overflow: "hidden", borderRadius: "4px",
                    border: `2px solid ${activeImg === i ? "#d4a853" : "transparent"}`,
                    cursor: "pointer", padding: 0, background: "#f0ece4",
                    transition: "border-color 0.2s", flexShrink: 0,
                    boxShadow: activeImg === i ? "0 0 0 1px #d4a853" : "none",
                  }}
                >
                  <img src={img} alt={`View ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <span style={{ color: "#d4a853", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "sans-serif" }}>
              {product.category}
            </span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#1a1a1a", margin: "0.4rem 0 0.6rem", lineHeight: 1.1 }}>
              {product.name}
            </h1>

            {/* Rating summary */}
            {reviews.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <Stars rating={Math.round(avgRating)} size="0.9rem" />
                <span style={{ fontSize: "0.78rem", color: "#888", fontFamily: "sans-serif" }}>
                  {avgRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                </span>
              </div>
            )}

            <p style={{ fontSize: "1.8rem", fontWeight: 600, color: "#1a1a1a", fontFamily: "sans-serif", marginBottom: "1rem" }}>
              ${product.price?.toFixed(2)}
            </p>

            <div style={{ width: "36px", height: "1px", background: "#d4a853", marginBottom: "1.3rem" }} />

            <p style={{ color: "#555", lineHeight: 1.85, fontFamily: "sans-serif", fontSize: "0.9rem", marginBottom: "2rem" }}>
              {product.description}
            </p>

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: "1.8rem" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#888", fontFamily: "sans-serif", marginBottom: "0.7rem" }}>
                  Size
                </p>
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: "0.5rem 1.2rem",
                        border: `1px solid ${selectedSize === size ? "#1a1a1a" : "#ddd"}`,
                        background: selectedSize === size ? "#1a1a1a" : "#fff",
                        color: selectedSize === size ? "#fff" : "#555",
                        fontSize: "0.8rem", fontFamily: "sans-serif",
                        cursor: "pointer", borderRadius: "3px", transition: "all 0.2s",
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div style={{ display: "flex", gap: "0.8rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              <button
                style={{
                  background: "#1a1a1a", color: "#fff", border: "none",
                  padding: "0.9rem 2.2rem", fontSize: "0.65rem", letterSpacing: "0.25em",
                  textTransform: "uppercase", fontFamily: "sans-serif", cursor: "pointer",
                  borderRadius: "3px", transition: "background 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#d4a853"; e.currentTarget.style.color = "#0a0a0a"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
              >
                Add to Cart
              </button>
              <button
                style={{
                  background: "transparent", color: "#1a1a1a",
                  border: "1px solid #ddd", padding: "0.9rem 1.6rem",
                  fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
                  fontFamily: "sans-serif", cursor: "pointer", borderRadius: "3px", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a1a1a"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#ddd"; }}
              >
                ♡ Wishlist
              </button>
            </div>

            {/* Share */}
            <ShareSection />
          </div>
        </div>

        {/* ── Reviews section ── */}
        <div style={{ borderTop: "1px solid #e8e4de", paddingTop: "4rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "2rem" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2.2rem", fontWeight: 300, color: "#1a1a1a" }}>
              Customer Reviews
            </h2>
            <span style={{ fontSize: "0.8rem", color: "#aaa", fontFamily: "sans-serif" }}>
              ({reviews.length})
            </span>
          </div>

          {/* Rating summary bar */}
          <RatingBar reviews={reviews} />

          <div className="reviews-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>

            {/* Review list */}
            <div>
              {reviews.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem", background: "#f9f7f4", borderRadius: "6px", border: "1px dashed #ddd" }}>
                  <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✍️</p>
                  <p style={{ color: "#888", fontFamily: "sans-serif", fontSize: "0.9rem" }}>No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                reviews.map(r => (
                  <div key={r._id} style={{ borderBottom: "1px solid #ede9e3", paddingBottom: "1.6rem", marginBottom: "1.6rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <div>
                        <span style={{ fontFamily: "sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#1a1a1a", display: "block" }}>{r.name}</span>
                        <span style={{ color: "#bbb", fontSize: "0.7rem", fontFamily: "sans-serif" }}>
                          {new Date(r.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                      </div>
                      <Stars rating={r.rating} size="0.9rem" />
                    </div>
                    {r.comment && (
                      <p style={{ color: "#555", fontSize: "0.87rem", fontFamily: "sans-serif", lineHeight: 1.7, marginTop: "0.5rem" }}>
                        {r.comment}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Review form */}
            <div>
              <ReviewForm productId={id} onReviewAdded={review => setReviews(prev => [review, ...prev])} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0.4; } to { opacity: 1; } }
        @media (max-width: 768px) {
          .product-layout { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .reviews-layout { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </div>
  );
}
