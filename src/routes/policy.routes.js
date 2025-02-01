import { Router } from "express";
import { purchasePolicy } from "../controllers/policy.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/purchasePolicy",verifyToken, purchasePolicy);

export default router;
