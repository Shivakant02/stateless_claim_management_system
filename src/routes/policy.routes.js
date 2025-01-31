import { Router } from "express";
import { purchasePolicy } from "../controllers/policy.controller.js";

const router = Router();

router.post("/purchasePolicy", purchasePolicy);

export default router;
