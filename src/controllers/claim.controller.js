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

    if (req.body.lossAmount > 1000000) {
      return res
        .status(400)
        .send({ message: "claimed amount is more than tha coverage amount " });
    }

    const claim = new Claim(req);
    claim_db[claim.id] = claim;
    console.log(claim_db[claim.id]);

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
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).send({ message: "claim id required" });
    }
    if (!claim_db[id]) {
      return res.status(404).send({ message: "Claim not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Claim retrieved successfully",
      claim: claim_db[id],
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//function to update the claim details
export const updateClaim = (req, res) => {
  const { id } = req.params;
  const { user_id, dateOfLoss, lossDescription, lossAmount } = req.body;
  // console.log(id);
  // console.log(claim_db[id]);
  try {
    if (!claim_db[id]) {
      return res.status(404).send({ message: "Claim not found" });
    }
    if (user_id != claim_db[id].user_id) {
      return res
        .status(403)
        .send({ message: "user does not have permission to update the claim" });
    }
    if (dateOfLoss) claim_db[id].dateOfLoss = dateOfLoss;
    if (lossDescription) claim_db[id].lossDescription = lossDescription;
    if (lossAmount) claim_db[id].lossAmount = lossAmount;

    return res.status(200).json({
      success: true,
      message: "Claim updated successfully",
      claim: claim_db[id],
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// function to delete the claim
export const deleteClaim = (req, res) => {
  const { user_id, id } = req.params;
  try {
    if (claim_db[id].user_id != user_id) {
      return res
        .status(403)
        .send({ message: "user does not have permission to delete" });
    }
    if (!claim_db[id]) {
      return res.status(404).send({ message: "Claim not found" });
    }

    delete claim_db[id];
    return res.status(200).send({ message: "Claim deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
