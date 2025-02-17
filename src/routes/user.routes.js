import { Router } from "express";
import { forgotPassword, getUserProfile, logout, resetPassword, signin, signup } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getMe",verifyToken,getUserProfile);
router.get("/logout",verifyToken,logout);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword/:resetToken",resetPassword);

export default router;
