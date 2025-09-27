import express from "express";
import upload from "../middlewares/multer.js";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  addComment,
  deleteBlogImage,
  getBlogBySlug, // ✅ Import the new controller function
  likeBlog,
  getBlogsByUser,
} from "../controllers/blogController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

const blogImageUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "authorImage", maxCount: 1 },
]);

// ✅ Blog Routes
router.post("/", protect, blogImageUpload, createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.get("/slug/:slug", getBlogBySlug);
router.get("/user/my-blogs", protect, getBlogsByUser);
router.put("/:id", protect, blogImageUpload, updateBlog);
router.delete("/:id", protect, deleteBlog);
router.delete("/:id/image", protect, deleteBlogImage);

router.post("/:id/comments", addComment);
router.put("/like/:id", protect, likeBlog);

export default router;
