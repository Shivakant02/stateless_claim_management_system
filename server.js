import express from "express";
import claimRoutes from "./src/routes/claim.routes.js";
// import { submitClaim } from "./src/controllers/claim.controller.js";
const app = express();

app.use(express.json());

const PORT = 8000;

app.get("/", (req, res) => {
  return res.status(200).send("Server is running");
});

app.use("/api/v1/claim", claimRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on:http://localhost:${PORT}`);
});
