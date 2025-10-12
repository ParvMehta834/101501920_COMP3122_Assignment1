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
      message: "User created successfully.",
      user_id: user._id
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne(email ? { email } : { username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: false,
        message: "Invalid Username and password"
      });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({
      message: "Login successful.",
      jwt_token: token
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};