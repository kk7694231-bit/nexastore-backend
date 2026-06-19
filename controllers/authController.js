import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    console.log("USER EXISTS:", userExists);

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("PASSWORD HASHED");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    console.log("USER CREATED:", user);

    res.status(201).json({
      message: "Registration Successful"
    });

  } catch (error) {
  console.error("REGISTER ERROR:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack
  });
}

export const loginUser = async (req, res) => {
   try {
    console.log("Request Body:", req.body);
    console.log("MONGO_URI Exists:", !!process.env.MONGO_URI);
    console.log("JWT_SECRET Exists:", !!process.env.JWT_SECRET);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};