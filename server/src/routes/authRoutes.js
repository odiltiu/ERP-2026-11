import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role, firstname: user.firstname },
    process.env.JWT_SECRET || "najot_talim_secret_key_2026",
    { expiresIn: "7d" }
  );
};

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password, role } = req.body;

    if (!firstname || !lastname || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Iltimos, barcha maydonlarni to'ldiring (ism, familiya, email, telefon, parol)",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Ushbu email bilan foydalanuvchi allaqachon mavjud",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      role: role || "student",
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, login, password } = req.body;
    const identifier = login || email;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Login (email yoki telefon) va parolni kiriting",
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier.trim() }, { phone: identifier.trim() }],
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Login yoki parol noto'g'ri",
      });
    }

    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: "Ushbu profil uchun parol o'rnatilmagan",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Email yoki parol noto'g'ri",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Muvaffaqiyatli kirdingiz",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
