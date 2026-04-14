import Review from "../models/Review.js";

export async function getReviews(req, res) {
  const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
  res.json(reviews);
}

export async function createReview(req, res) {
  const { productId, name, rating, comment } = req.body;
  if (!productId || !name || !rating) {
    return res.status(400).json({ message: "productId, name and rating are required" });
  }
  const review = await Review.create({ product: productId, name, rating, comment });
  res.status(201).json(review);
}
