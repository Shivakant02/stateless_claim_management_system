import { Router } from "express";
import { approveClaim, approveMultipleClaims, fetchAllClaims, fetchAllPolicies, fetchAllUsers, rejectClaim } from "../controllers/admin.controller.js";
import { verifyRole, verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.patch("/approve/:id",verifyToken,verifyRole("admin"), approveClaim);
router.patch("/reject/:id",verifyToken,verifyRole("admin"), rejectClaim);
router.get("/fetchAllClaims",verifyToken,verifyRole("admin"), fetchAllClaims);
router.post("/approve-multiple",verifyToken,verifyRole("admin"), approveMultipleClaims);

router.get("/getAllUsers",verifyToken,verifyRole("admin"), fetchAllUsers);
router.get("/getAllPolicies",verifyToken,verifyRole("admin"), fetchAllPolicies);

export default router;
