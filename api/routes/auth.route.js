import express from "express";
import { register, login, logout, requestEmailOtp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/request-otp", requestEmailOtp)
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

export default router;
