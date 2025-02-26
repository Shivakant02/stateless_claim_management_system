import Claim from "../model/claim.model.js";
import ClaimHistory from "../model/claimHistory.model.js";
import Policy from "../model/policy.model.js";
import User from "../model/user.model.js";
import AppError from "../utils/AppError.js";
import { generateClaimPDF } from "../utils/generatePDF.js";
import { sendClaimSubmittedEmail } from "../utils/sendEmails.js";

export const submitClaim = async (req, res,next) =>{
try {
  const userId = req.user.id;
  const user=await User.findById(userId);

  if(!user){
    return next(new AppError("User not found", 400)); 
  }

  

  const policyId=req.params.id;
  // console.log(policyId);

  const policy=await Policy.findById(policyId);
  if(!policy){
    return next(new AppError("Policy not found", 400));
  }

  const claimExist=await Claim.findOne({policyId:policyId});
  if(claimExist){
    return next(new AppError("Claim already submitted for this policy", 400));
  }
    
if(policy.policyHolder.toString()!==userId){
  return next(new AppError("You are not authorized to submit claim for this policy", 401));
}


// console.log(policy);
  const {claimAmount,claimReason}=req.body;
  // console.log(req.body)
  if (!claimAmount || !claimReason) {
    return next(new AppError("Please provide all required fields", 400));
  }

  if(claimAmount>policy.coverage){
    return next(new AppError("Claim amount cannot be greater than policy amount", 400));
  }

  const claim = await Claim.create({
    policyId:policy._id,
    claimAmount:claimAmount,
    claimReason:claimReason,
    policyHolder:user._id,
    type:policy.type,
    email:policy.email,
  });

  // policy.isClaimed=true;
  policy.status="under claim process";
  await policy.save();
  user.claims.push(claim._id);
  await claim.save();
  await user.save();

  let claimHistory = await ClaimHistory.findOne();
  if (!claimHistory) {
    claimHistory = new ClaimHistory();
  }
  claimHistory.pendingClaims.push(claim._id);
 await claimHistory.save();

//  console.log(claimHistory);

const claimPdf=await generateClaimPDF(claim,user);

await sendClaimSubmittedEmail(policy.email,claim._id,claimPdf);

  return res.status(201).json({
    success: true,
    message: "Claim submitted successfully",
    claim,
  });

} catch (error) {
  return next(new AppError(error.message, 500));
}
} 

// get a claim
export const getClaim = async (req, res,next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User does not exist", 400));
    }

    const claimId = req.params.id;
    const claim = await Claim.findById(claimId);
    if (!claim) {
      return next(new AppError("Claim not found", 400));
    }

    if (claim.policyHolder.toString()!== userId) {
      return next(new AppError("You are not authorized to view this claim", 401));
    }

    return res.status(200).json({
      success: true,
      claim,
    });
    
  } catch (error) {
    return next(new AppError(error.message, 500));
    
  }
}

//update a claim
export const updateClaim = async (req, res,next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 400));
    }

    const claimId = req.params.id;
    const claim = await Claim.findById(claimId);
    if (!claim) {
      return next(new AppError("Claim not found", 400));
    }

    if (claim.policyHolder.toString()!== userId) {
      return next(new AppError("You are not authorized to update this claim", 401));
    }

    const { claimAmount, claimReason } = req.body;

    claim.claimAmount = claimAmount?claimAmount:claim.claimAmount;
    claim.claimReason = claimReason?claimReason:claim.claimReason;
    claim.status = "pending";
    await claim.save();

    const claimHistory=await ClaimHistory.findOne();
    claimHistory.rejectedClaims = claimHistory.rejectedClaims.filter(
      (id) => id.toString() !== claim._id.toString()
    );
    claimHistory.pendingClaims.push(claim._id);
    await claimHistory.save();

    return res.status(200).json({
      success: true,
      message: "Claim updated successfully",
      claim,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}

//delete a claim
export const deleteClaim = async (req, res,next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 400));
    }

    const claimId = req.params.id;
    const claim = await Claim.findById(claimId).populate("policyId");
    // const policyId = claim.policyId;
    if (!claim) {
      return next(new AppError("Claim not found", 400));
    }

    if (claim.policyHolder.toString()!== userId) {
      return next(new AppError("You are not authorized to delete this claim", 401));
    }

    await Claim.findByIdAndDelete(claimId);
    await user.claims.pull(claimId);
    await user.save();

    claim.policyId.status = "active";
    await claim.policyId.save();

    return res.status(200).json({
      success: true,
      message: "Claim deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}

// function to get all claims
export const getAllClaims = async (req, res,next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("claims");
    if (!user) {
      return next(new AppError("User not found", 400));
    }

    return res.status(200).json({
      success: true,
      message: "All claims retrieved successfully",
      claims: user.claims,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
}