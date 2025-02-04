import Policy from "../model/policy.model.js";
import User from "../model/user.model.js";
import AppError from "../utils/AppError.js";

//perchase policy function
export const purchasePolicy = async(req, res,next) => {
  try {
    const userId = req.user.id;
    const user=await User.findById(userId);
    if(!user){
      return next(new AppError("user does not exist", 404));
    }

    const {type,coverage,premium} = req.body;
    if (!type || !coverage || !premium ) {
      return next(new AppError("Please provide all required fields", 400));
    }

    const policy = await Policy.create({
      type:type,
      coverage:coverage,
      premium:premium,
      avatar:req.body.avatar||"",
      policyHolder:user._id
    });

    user.policies.push(policy._id);
    // await policy.save();
    await user.save();


    
    return res.status(201).json({
      success: true,
      message: "policy purchased successfully",
      policy,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// get policy by id 
export const getPolicyById = async(req, res,next) => {
  try {
    const policyId = req.params.id;
    const policy = await Policy.findById(policyId);
    if (!policy) {
      return next(new AppError("policy not found", 404));
    }
    return res.status(200).json({
      message: true,
      policy,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}

export const getAllPolicies = async(req, res,next) => {
  try {
    const user = await User.findById(req.user.id).populate("policies");
    
    return res.status(200).json({
      success: true,
      message: "All policies fetched successfully",
      policies:user.policies,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}
