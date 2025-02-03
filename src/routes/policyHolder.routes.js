import { Router } from "express";
import {
  createPolicyHolder,
  getPolicyHolder,
} from "../controllers/policyHolder.controller.js";

const router = Router();

router.post("/createPolicyHolder", createPolicyHolder);
router.get("/getPolicyHolder", getPolicyHolder);

export default router;
