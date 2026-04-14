import express from "express";
import { getReviews, createReview } from "../controllers/reviewController.js";

const router = express.Router();

router.route("/:productId").get(getReviews);
router.route("/").post(createReview);

export default router;
