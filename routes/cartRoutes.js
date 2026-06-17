import express from "express";

import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartQuantity
} from "../controllers/cartcontroller.js";

const router = express.Router();

router.post("/", addToCart);

router.get("/", getCart);

router.put("/:id", updateCartQuantity);

router.delete("/:id", removeCartItem);

export default router;