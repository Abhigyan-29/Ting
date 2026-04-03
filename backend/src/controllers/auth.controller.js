import { sendWelcomeEmail, sendResetPasswordEmail } from "../emails/emailHandlers.js";
import { generateToken, generateResetToken } from "../lib/utils.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, username, password } = req.body;

  try {
    if (!fullName || !email || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (username.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const userByEmail = await User.findOne({ email });
    if (userByEmail) return res.status(400).json({ message: "Email already exists" });

    const userByUsername = await User.findOne({ username: username.toLowerCase() });
    if (userByUsername) return res.status(400).json({ message: "Username already exists" });

    // 123456 => $dnjasdkasj_?dmsakmk
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    if (newUser) {
      // before CR:
      // generateToken(newUser._id, res);
      // await newUser.save();

      // after CR:
      // Persist user first, then issue auth cookie
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        username: savedUser.username,
        profilePic: savedUser.profilePic,
        blockedUsers: savedUser.blockedUsers,
      });

      try {
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: "Email/Username and password are required" });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }],
    });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    // never tell the client which one is incorrect: password or email

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      profilePic: user.profilePic,
      blockedUsers: user.blockedUsers,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = generateResetToken(user._id);
    const resetURL = `${ENV.CLIENT_URL}/reset-password?token=${resetToken}`;

    await sendResetPasswordEmail(user.email, user.fullName, resetURL);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error in forgotPassword controller:", error);
    // return a more specific message if provider fails
    const errorMessage = error.response?.data?.message || error.message || "Failed to send reset email";
    res.status(400).json({ message: errorMessage });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    if (!token || !password || password.length < 6) {
      return res.status(400).json({ message: "Valid token and password (min 6 chars) are required" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) return res.status(400).json({ message: "Invalid or expired token" });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const blockUser = async (req, res) => {
  try {
    const { id: userToBlockId } = req.params;
    const myId = req.user._id;

    if (myId.toString() === userToBlockId) {
      return res.status(400).json({ message: "You cannot block yourself" });
    }

    const user = await User.findById(myId);
    if (!user.blockedUsers.includes(userToBlockId)) {
      user.blockedUsers.push(userToBlockId);
      await user.save();
    }

    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.error("Error in blockUser controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const { id: userToUnblockId } = req.params;
    const myId = req.user._id;

    const user = await User.findById(myId);
    user.blockedUsers = user.blockedUsers.filter((id) => id.toString() !== userToUnblockId);
    await user.save();

    res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    console.error("Error in unblockUser controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

