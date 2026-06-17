import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    res.status(201).json({
      message: "Registration Successful"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email Received:", email);

    const user = await User.findOne({ email });

    console.log("User Found:", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

      res.status(200).json({
      message: "Login Successful",
      token,
      role: user.role,
      userId: user._id
    }
  );

  } catch (error) {
    console.log("Login Error:", error);

    res.status(500).json({
      message: error.message
    });
  }
};