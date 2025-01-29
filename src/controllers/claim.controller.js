import { Claim, claim_db } from "../model/claim.model.js";

// function to submit the claim
export const submitClaim = (req, res) => {
  try {
    if (
      !req.body.user_id ||
      !req.body.policyNumber ||
      !req.body.dateOfLoss ||
      !req.body.lossDescription ||
      !req.body.lossAmount
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const claim = new Claim(req);
    claim_db[req.body.id] = claim;
    console.log(claim_db[req.body.id]);

    return res.status(201).json({
      success: true,
      message: "Claim created successfully",
      claim,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//funtion to get the claim
export const getClaim = (req, res) => {
  try {
    if (!req.params.user_id) {
      return res.status(400).send({ message: "User ID is required" });
    }
    if (!claim_db[req.params.id]) {
      return res.status(404).send({ message: "Claim not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Claim retrieved successfully",
      claim: claim_db[req.params.id],
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
