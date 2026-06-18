import express from "express";

import {
  addToWishlist,
  getWishlist,
  removeWishlistItem
} from "../controllers/wishlistcontroller.js";

const router = express.Router();

router.post("/", addToWishlist);

router.get("/", getWishlist);

router.delete("/:id", removeWishlistItem);

export default router;