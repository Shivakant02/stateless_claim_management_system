import { Policy, policy_db } from "../model/policy.model.js";
export const createPolicy = (req, res) => {
  try {
    const {
      user_id,
      policyNumber,
      type,
      start_date,
      valid_till,
      coverage,
      premium,
    } = req.body;
    // console.log(req.body);

    if (!user_id) {
      return res.status(404).send({ message: "Please login to buy a policy" });
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

    policy_db[policy.id] = policy;
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
