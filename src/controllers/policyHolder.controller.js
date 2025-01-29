// function to create a policyHolder

import { PolicyHolder, policyHolder_db } from "../model/policyHolder.model.js";

export const createPolicyHolder = (req, res) => {
  // console.log(req.body);
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.phone_no ||
      !req.body.address ||
      !req.body.city ||
      !req.body.state ||
      !req.body.pincode
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const policyHolder = new PolicyHolder(req);
    policyHolder_db[policyHolder.id] = policyHolder;
    // console.log(policyHolder_db[policyHolder.id]);

    return res.status(201).json({
      success: true,
      message: "Policy Holder created successfully",
      policyHolder,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// function to get a policyHolder
export const getPolicyHolder = (req, res) => {
  try {
    if (!policyHolder_db[req.params.id]) {
      return res.status(404).send({ message: "Policy Holder Not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Policy Holder found successfully",
      policyHolder: policyHolder_db[req.params.id],
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
