import { Router } from "express";
import { createPolicyHolder } from "../controllers/policyHolder.controller.js";

const router = Router();

router.post("/createPolicyHolder", createPolicyHolder);

export default router;
