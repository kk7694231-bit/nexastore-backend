import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    console.log("Authorization Header:", req.headers.authorization);

    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No Token Provided"
      });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("Decoded Token:", decoded);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);

    res.status(401).json({
      message: "Invalid Token"
    });
  }
};

export default authMiddleware;