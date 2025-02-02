import { Router } from "express";
import { getPolicyById, purchasePolicy } from "../controllers/policy.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/purchasePolicy",verifyToken, purchasePolicy);
router.get("/getPolicy/:id",verifyToken, getPolicyById);

export default router;
