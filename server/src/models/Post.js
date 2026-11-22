import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post sarlavhasi kiritilishi shart"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Post matni kiritilishi shart"],
      trim: true,
    },
    author: {
      type: String,
      default: "Najot Ta'lim",
    },
    category: {
      type: String,
      default: "Yangiliklar",
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
