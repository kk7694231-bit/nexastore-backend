import express from "express";

import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productcontroller.js";

import authMiddleware from "../middleware/authmiddleware.js";
import adminMiddleware from "../middleware/adminmiddleware.js";

const router = express.Router();

// Admin Only
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addProduct
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

// Public Routes
router.get("/", getProducts);

router.get("/:id", getProductById);

export default router;