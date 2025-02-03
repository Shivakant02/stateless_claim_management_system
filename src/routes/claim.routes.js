import { Router } from "express";
import {
  deleteClaim,
  getClaim,
  getClaimStatus,
  submitClaim,
  updateClaim,
} from "../controllers/claim.controller.js";

const router = Router();

// Route to handle Claims
router.post("/submitClaim", submitClaim);
router.get("/getClaim/:policy_id", getClaim);
router.get("/claimStatus/:policy_id", getClaimStatus);
router.put("/updateClaim/:policy_id", updateClaim);
router.delete("/delete/:policy_id", deleteClaim);

export default router;
