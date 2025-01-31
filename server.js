import express from "express";
import claimRoutes from "./src/routes/claim.routes.js";
import policyRoutes from "./src/routes/policy.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import { config } from "dotenv";
import connectToDatabase from "./src/config/dbConfig.js";
import cookieParser from "cookie-parser";

import userRoutes from "./src/routes/user.routes.js";
config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).send("Server is running");
});

app.use("/api/v1/claim", claimRoutes);
app.use("/api/v1/policy", policyRoutes);
app.use("/api/v1/admin", adminRoutes);

//user routes
app.use("/api/v1/user", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on:http://localhost:${PORT}`);
});
