const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const getProducts = () => request("/products");
export const getProductById = (id) => request(`/products/${id}`);
export const getReviews = (productId) => request(`/reviews/${productId}`);
export const createReview = (data) => request("/reviews", { method: "POST", body: JSON.stringify(data) });
