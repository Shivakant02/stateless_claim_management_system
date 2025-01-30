import { Router } from "express";
import { approveClaim, rejectClaim } from "../controllers/admin.controller.js";

const router = Router();

router.patch("/claims/approve/:id", approveClaim);
router.patch("/claims/reject/:id", rejectClaim);

export default router;
