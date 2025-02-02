import express from "express";
import claimRoutes from "./src/routes/claim.routes.js";
import policyRoutes from "./src/routes/policy.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import { config } from "dotenv";
import connectToDatabase from "./src/config/dbConfig.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./src/routes/user.routes.js";
import { readFileSync } from "fs";
config();
const app = express();

const swaggerDoc = JSON.parse(readFileSync('./swagger-output.json', 'utf8'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).send("Server is running");
});


app.use("/api/v1/user",/*#swagger.tags = ['User'] */ userRoutes);
app.use("/api/v1/policy",/*#swagger.tags=['Policy']*/ policyRoutes);
app.use("/api/v1/claim",/*#swagger.tags=['Claim']*/ claimRoutes);
app.use("/api/v1/admin",/*#swagger.tags=['Admin']*/ adminRoutes);

//user routes

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on:http://localhost:${PORT}`);
});
