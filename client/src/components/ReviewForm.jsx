import { useState } from "react";
import { createReview } from "../services/api";

export default function ReviewForm({ productId, onReviewAdded }) {
  const [form, setForm] = useState({ name: "", rating: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.rating === 0) { setError("Please select a rating."); return; }
    setLoading(true);
    setError(null);
    try {
      const review = await createReview({ ...form, productId });
      onReviewAdded(review);
      setForm({ name: "", rating: 0, comment: "" });
      setHoverRating(0);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inp = {
    width: "100%", border: "1px solid #e0dbd4", borderRadius: "3px",
    padding: "0.7rem 1rem", fontSize: "0.88rem", fontFamily: "'Jost', sans-serif",
    outline: "none", background: "#fff", boxSizing: "border-box", color: "#1a1a1a",
    transition: "border-color 0.2s",
  };

  const displayRating = hoverRating || form.rating;

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "2rem 2.2rem", border: "1px solid #ede9e3", borderRadius: "6px" }}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.6rem", fontWeight: 400, marginBottom: "0.3rem", color: "#1a1a1a" }}>
        Write a Review
      </h3>
      <p style={{ fontSize: "0.78rem", color: "#aaa", fontFamily: "sans-serif", marginBottom: "1.8rem" }}>
        Share your experience with this fragrance
      </p>

      {error && (
        <div style={{ background: "#fff5f5", border: "1px solid #fcc", borderRadius: "3px", padding: "0.6rem 1rem", marginBottom: "1rem", fontSize: "0.82rem", color: "#c0392b", fontFamily: "sans-serif" }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ background: "#f0fff4", border: "1px solid #9ae6b4", borderRadius: "3px", padding: "0.6rem 1rem", marginBottom: "1rem", fontSize: "0.82rem", color: "#276749", fontFamily: "sans-serif" }}>
          ✓ Review submitted successfully!
        </div>
      )}

      {/* Name */}
      <div style={{ marginBottom: "1.2rem" }}>
        <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", fontFamily: "sans-serif", marginBottom: "0.5rem" }}>
          Your Name *
        </label>
        <input
          type="text" required value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={inp} placeholder="e.g. Sarah M."
          onFocus={e => e.target.style.borderColor = "#d4a853"}
          onBlur={e => e.target.style.borderColor = "#e0dbd4"}
        />
      </div>

      {/* Star rating */}
      <div style={{ marginBottom: "1.2rem" }}>
        <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", fontFamily: "sans-serif", marginBottom: "0.5rem" }}>
          Rating *
        </label>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star} type="button"
              onClick={() => setForm({ ...form, rating: star })}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "2rem", lineHeight: 1, padding: "0 2px",
                color: star <= displayRating ? "#d4a853" : "#ddd",
                transform: star <= displayRating ? "scale(1.15)" : "scale(1)",
                transition: "color 0.15s, transform 0.15s",
              }}
            >
              ★
            </button>
          ))}
          {displayRating > 0 && (
            <span style={{ marginLeft: "0.5rem", fontSize: "0.78rem", color: "#888", fontFamily: "sans-serif" }}>
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][displayRating]}
            </span>
          )}
        </div>
      </div>

      {/* Comment */}
      <div style={{ marginBottom: "1.6rem" }}>
        <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", fontFamily: "sans-serif", marginBottom: "0.5rem" }}>
          Your Review
        </label>
        <textarea
          rows={4} value={form.comment}
          onChange={e => setForm({ ...form, comment: e.target.value })}
          style={{ ...inp, resize: "vertical", lineHeight: 1.6 }}
          placeholder="What did you love about this fragrance?"
          onFocus={e => e.target.style.borderColor = "#d4a853"}
          onBlur={e => e.target.style.borderColor = "#e0dbd4"}
        />
      </div>

      <button
        type="submit" disabled={loading}
        style={{
          width: "100%", background: loading ? "#888" : "#1a1a1a", color: "#fff",
          border: "none", padding: "0.9rem", fontSize: "0.7rem",
          letterSpacing: "0.25em", textTransform: "uppercase",
          fontFamily: "sans-serif", cursor: loading ? "not-allowed" : "pointer",
          borderRadius: "3px", transition: "background 0.2s",
        }}
        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#d4a853"; }}
        onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#1a1a1a"; }}
      >
        {loading ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
