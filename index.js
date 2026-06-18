import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import mongoose from "mongoose";
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT}`
  );
});





app.get("/", (req, res) => {
  res.send("Amazon Clone Backend Running");
});

mongoose.connect("mongodb://vinsupkishore:vinsupkishore@ac-cimxs3u-shard-00-00.bwcy5qr.mongodb.net:27017,ac-cimxs3u-shard-00-01.bwcy5qr.mongodb.net:27017,ac-cimxs3u-shard-00-02.bwcy5qr.mongodb.net:27017/?ssl=true&replicaSet=atlas-ni0tdb-shard-0&authSource=admin&appName=Cluster0")
.then(()=>{
  console.log("DB Connected");
})

.catch((err)=>{
  console.log(err);
})


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes); 
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);