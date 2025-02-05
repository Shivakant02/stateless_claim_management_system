import { Router } from "express";
import {deleteClaim, getAllClaims, getClaim, submitClaim, updateClaim,} from "../controllers/claim.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Route to handle Claims
router.post("/submitClaim/:id",verifyToken, submitClaim);
router.get("/getAllclaims",verifyToken, getAllClaims);

router
.route("/:id")
.get(verifyToken, getClaim)
.put(verifyToken, updateClaim)
.delete(verifyToken, deleteClaim);

export default router;
