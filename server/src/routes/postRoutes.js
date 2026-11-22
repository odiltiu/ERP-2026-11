import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, content, author, category, imageUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Post sarlavhasi va matni kiritilishi shart",
      });
    }

    const post = await Post.create({
      title,
      content,
      author: author || "Najot Ta'lim",
      category: category || "Yangiliklar",
      imageUrl: imageUrl || "",
    });

    res.status(201).json({
      success: true,
      message: "Yangi post muvaffaqiyatli qo'shildi",
      data: post,
    });
  } catch (error) {
    console.error("Post yaratish xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Postlarni olish xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post o'chirildi",
    });
  } catch (error) {
    console.error("Post o'chirish xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
