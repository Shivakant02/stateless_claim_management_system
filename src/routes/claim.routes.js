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
router.get("/getClaim/:id", getClaim);
router.get("/claimStatus/:id", getClaimStatus);
router.put("/updateClaim/:id", updateClaim);
router.delete("/delete/:user_id/:id", deleteClaim);

export default router;
