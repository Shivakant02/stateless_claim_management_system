import express from "express";
import claimRoutes from "./src/routes/claim.routes.js";
import policyHolderRoutes from "./src/routes/policyHolder.routes.js";
import policyRoutes from "./src/routes/policy.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
const app = express();

app.use(express.json());

const PORT = 8000;

app.get("/", (req, res) => {
  return res.status(200).send("Server is running");
});

app.use("/api/v1/claim", claimRoutes);
app.use("/api/v1/policyHolder", policyHolderRoutes);
app.use("/api/v1/policy", policyRoutes);
app.use("/api/v1/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on:http://localhost:${PORT}`);
});
