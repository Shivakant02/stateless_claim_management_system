import { Router } from "express";
import { getUserProfile, signin, signup } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getMe",verifyToken,getUserProfile);

export default router;
