import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(409).json({
        status: false,
        message: "User already exists"
      });
    }

    const user = await User.create({ username, email, password });

    return res.status(201).json({
      status: true,
      message: "User registered successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // allow login by email OR username
    const query = {};
    if (email) query.email = email;
    if (username) query.username = username;

    const user = await User.findOne(query);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      status: true,
      message: "Login successful.",
      token // <-- frontend will use this
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message });
  }
};
