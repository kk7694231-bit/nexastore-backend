import express from "express";

import {
  getDashboard,
  getAllUsers,
  getAllOrders,
  getAnalytics
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboard
);

// All Users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers,
  getAnalytics
);

// All Orders
router.get(
  "/orders",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

// get analytics
router.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  getAnalytics
);

export default router;