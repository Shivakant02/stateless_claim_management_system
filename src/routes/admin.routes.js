import { Router } from "express";
import { approveClaim, fetchAllClaims, rejectClaim } from "../controllers/admin.controller.js";
import { verifyRole, verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.patch("/approve/:id",verifyToken,verifyRole("admin"), approveClaim);
router.patch("/reject/:id",verifyToken,verifyRole("admin"), rejectClaim);
router.get("/fetchAllClaims",verifyToken,verifyRole("admin"), fetchAllClaims);

export default router;
