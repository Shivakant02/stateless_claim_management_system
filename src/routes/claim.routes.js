import { Router } from "express";
import { getClaim, submitClaim } from "../controllers/claim.controller.js";

const router = Router();

// Route to handle Claims
router.post("/submitClaim", submitClaim);
router.get("/getClaim/:user_id", getClaim);

export default router;
