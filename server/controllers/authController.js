const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Create JWT
const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ========================
// Signup
// ========================
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const newUser = await User.create({ name, email, password });
    const token = createToken(newUser._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 86400000, // 1 day
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(201)
      .json({ message: "Account created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ========================
// Login
// ========================
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const token = createToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 86400000, // 1 day
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ========================
// Logout
// ========================
exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // instantly expire
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// ========================
// Get current user
// ========================
exports.getMe = async (req, res) => {
  // If protect middleware failed, req.user will be null
  if (!req.user) return res.status(200).json({ user: null });
  res.status(200).json({ user: req.user });
};
