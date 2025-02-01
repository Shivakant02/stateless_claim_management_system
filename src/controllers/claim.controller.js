import Claim from "../model/claim.model.js";
import Policy from "../model/policy.model.js";
import User from "../model/user.model.js";
import AppError from "../utils/AppError.js";

export const submitClaim = async (req, res,next) =>{
try {
  const userId = req.user.id;
  const user=await User.findById(userId);

  if(!user){
    return next(new AppError("User not found", 404)); 
  }

  

  const policyId=req.params.id;
  // console.log(policyId);
  
  const policy=await Policy.findById(policyId);
  if(!policy){
    return next(new AppError("Policy not found", 404));
  }

if(policy.policyHolder!==userId){
  return next(new AppError("You are not authorized to submit claim for this policy", 401));
}

console.log(policy);
  const {claimAmount,claimReason}=req.body;
  if (!claimAmount || !claimReason) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const claim = await Claim.create({
    policyId:policy._id,
    claimAmount:claimAmount,
    claimReason:claimReason,
    policyHolder:user._id
  });

  user.claims.push(claim._id);
  await user.save();
 
  return res.status(201).json({
    success: true,
    message: "Claim submitted successfully",
    claim,
  });

} catch (error) {
  return next(new AppError(error.message, 500));
}
} 
