import { Claim, claim_db } from "../model/claim.model.js";
import { claim_records_db } from "../model/claimRecords.model.js";

// function to submit the claim
export const submitClaim = (req, res) => {
  try {
    if (
      !req.body.user_email ||
      !req.body.policyNumber ||
      !req.body.dateOfLoss ||
      !req.body.lossDescription ||
      !req.body.lossAmount
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if(claim_db[req.body.policyNumber]){
      return res.status(400).send({ message: "Claim already exists" });
    }

    if (req.body.lossAmount > 1000000) {
      return res
        .status(400)
        .send({ message: "claimed amount is more than tha coverage amount " });
    }
    const claim = new Claim(req);
    claim_db[claim.policyNumber] = claim;
    // console.log(claim_db[claim.policyNumber]);

    claim_records_db.pending[claim.policyNumber] = claim;

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
  const { policy_id } = req.params;
  try {
    if (!policy_id) {
      return res.status(400).send({ message: " id required" });
    }
    if (!claim_db[policy_id]) {
      return res.status(404).send({ message: "Claim not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Claim retrieved successfully",
      claim: claim_db[policy_id],
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//function to update the claim details
export const updateClaim = (req, res) => {
  const { policy_id } = req.params;
  const { user_email, dateOfLoss, lossDescription, lossAmount } = req.body;
  // console.log(id);
  // console.log(claim_db[id]);
  try {
    if (!claim_db[policy_id]) {
      return res.status(404).send({ message: "Claim not found" });
    }
    if (user_email != claim_db[policy_id].user_email) {
      return res
        .status(403)
        .send({ message: "user does not have permission to update the claim" });
    }
    if (dateOfLoss) claim_db[policy_id].dateOfLoss = dateOfLoss;
    if (lossDescription) claim_db[policy_id].lossDescription = lossDescription;
    if (lossAmount) claim_db[policy_id].lossAmount = lossAmount;

    return res.status(200).json({
      success: true,
      message: "Claim updated successfully",
      claim: claim_db[policy_id],
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// function to delete the claim
export const deleteClaim = (req, res) => {
  const { policy_id } = req.params;
  const { user_email } = req.body;
  try {
    if (claim_db[policy_id].user_email != user_email) {
      return res
        .status(403)
        .send({ message: "user does not have permission to delete" });
    }
    if (!claim_db[policy_id]) {
      return res.status(404).send({ message: "Claim not found" });
    }

    delete claim_db[policy_id];
    return res.status(200).send({ message: "Claim deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//function to get claim status
export const getClaimStatus = (req, res) => {
  const { policy_id } = req.params;
  try {
    if (!policy_id) {
      return res.status(400).send({ message: "policy id required" });
    }
    if (!claim_db[policy_id]) {
      return res.status(404).send({ message: "claim not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Claim status retrieved successfully",
      status: claim_db[policy_id].status,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
