import express from "express";
import { signup, login, getUserInfo } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// SIGNUP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

// GET USER INFO
router.get("/userinfo", protect, getUserInfo);

export default router;
