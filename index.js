import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Amazon Clone Backend Running");
});

// mongoose
app.get("/mongo-uri-check", (req, res) => {
  res.json({
    hasMongoUri: !!process.env.MONGO_URI,
    uriStart: process.env.MONGO_URI?.substring(0, 30),
  });
});

app.get("/test-db", async (req, res) => {
  try {
    res.json({
      mongoState: mongoose.connection.readyState,
      mongoHost: mongoose.connection.host,
      mongoName: mongoose.connection.name,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

// Local Development Only
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`);
  });
}

export default app;