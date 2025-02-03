import { claim_db } from "../model/claim.model.js";
import { claim_records_db } from "../model/claimRecords.model.js";
// import { ClaimRecords, claim_records_db } from "../model/claimRecords.model.js";

//function to approve a claim
export const approveClaim = (req, res) => {
  const { id } = req.params;

  try {
    if (!claim_db[id]) {
      return res.status(404).send({ message: "Claim not found" });
    }
    claim_db[id].status = "approved";
    claim_records_db.approved[id] = claim_db[id];
    claim_records_db.pending[id] = null;
    return res.status(200).json({
      success: true,
      message: "Claim approved successfully",
      claim: claim_db[id],
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//function to reject a claim
export const rejectClaim = (req, res) => {
  const { id } = req.params;
  try {
    if (!claim_db[id]) {
      return res.status(404).send({ message: "Claim not found" });
    }
    claim_db[id].status = "rejected";
    claim_records_db.pending[id] = null;
    return res.status(200).json({
      success: true,
      message: "Claim rejected",
      claim: claim_db[id],
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//function to get all claim records
export const getAllClaimRecords = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Claim records retrieved successfully",
      claimRecords: claim_db,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
