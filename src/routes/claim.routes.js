import { Router } from "express";
import {getClaim, submitClaim,} from "../controllers/claim.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Route to handle Claims
router.post("/submitClaim/:id",verifyToken, submitClaim);

router
.route("/:id")
.get(verifyToken, getClaim);

export default router;
