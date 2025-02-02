import { Router } from "express";
import { approveClaim } from "../controllers/admin.controller.js";
import { verifyRole, verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.patch("/approve/:id",verifyToken,verifyRole("admin"), approveClaim);

export default router;
