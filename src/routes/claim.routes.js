import { Router } from "express";
import {submitClaim,} from "../controllers/claim.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Route to handle Claims
router.post("/submitClaim/:id",verifyToken, submitClaim);

export default router;
