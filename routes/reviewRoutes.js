import express from "express";

import {
  addReview,
  getReviews
} from "../controllers/reviewcontroller.js";

const router = express.Router();

router.post("/", addReview);

router.get("/:productId", getReviews);

export default router;