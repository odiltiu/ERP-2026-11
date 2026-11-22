import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, email, phone, role } = req.body;

    if (!firstname || !lastname || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Ism, familiya, email va telefon kiritilishi shart",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Bu email bilan foydalanuvchi allaqachon mavjud",
      });
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      phone,
      role: role || "student",
    });

    res.status(201).json({
      success: true,
      message: "Yangi foydalanuvchi muvaffaqiyatli qo'shildi",
      data: user,
    });
  } catch (error) {
    console.error("User yaratish xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Userlarni olish xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
