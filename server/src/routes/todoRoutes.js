import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Todo sarlavhasi (title) kiritilishi shart",
      });
    }

    const todo = await Todo.create({
      title,
      description: description || "",
      isCompleted: isCompleted !== undefined ? isCompleted : false,
    });

    res.status(201).json({
      success: true,
      message: "Yangi todo muvaffaqiyatli qo'shildi",
      data: todo,
    });
  } catch (error) {
    console.error("Todo yaratish xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.error("Todolarni olish xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo topilmadi",
      });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;

    const updatedTodo = await todo.save();

    res.status(200).json({
      success: true,
      message: "Todo muvaffaqiyatli yangilandi",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Todo yangilash xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo o'chirildi",
    });
  } catch (error) {
    console.error("Todo o'chirish xatosi:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
