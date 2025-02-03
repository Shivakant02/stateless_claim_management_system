import { Policy, policy_db } from "../model/policy.model.js";
export const createPolicy = (req, res) => {
  try {
    const {
      user_email,
      policyNumber,
      type,
      start_date,
      valid_till,
      coverage,
      premium,
    } = req.body;
    // console.log(req.body);

    if (!user_email) {
      return res.status(404).send({ message: "Please login to buy a policy" });
    }
    if(policy_db[policyNumber]) {
      return res.status(400).send({ message: "Policy with this policy number already exists" });
    }

    if (
      !policyNumber ||
      !type ||
      !start_date ||
      !valid_till ||
      !coverage ||
      !premium
    ) {
      return res.status(400).send({ message: "all fields are required" });
    }
    const policy = new Policy(req);

    policy_db[policy.policyNumber] = policy;
    console.log(policy_db[policy.id]);
    return res.status(201).json({
      message: true,
      message: "policy created successfully",
      policy,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
