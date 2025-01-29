import { Router } from "express";
import { createPolicy } from "../controllers/policy.controller.js";

const router = Router();

router.post("/createPolicy", createPolicy);

export default router;
