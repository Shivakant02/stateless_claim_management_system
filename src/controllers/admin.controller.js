import Claim from '../model/claim.model.js';
import AppError from '../utils/AppError.js';
import Policy from '../model/policy.model.js';

export const approveClaim = async (req, res,next) => {
  try {
    const userId=req.user.id;
    if(!userId){
      return next(new AppError("Unauthorized,please login to continue",401));
    }

    const claimId=req.params.id
    const claim=await Claim.findById(claimId);
    if(!claim){
      return next(new AppError("Claim not found",400));
    }

    
    claim.status="approved";
    await claim.save();

    return res.status(200).json({
      message:"Claim approved successfully",
      claim
    });

    
  } catch (error) {
    return next(new AppError(error.message, 500));
    
  }
}

// reject claim
export const rejectClaim = async (req, res,next) => {
  try {
    const userId=req.user.id;
    if(!userId){
      return next(new AppError("Unauthorized,please login to continue",401));
    }

    const claimId=req.params.id
    const claim=await Claim.findById(claimId);
    if(!claim){
      return next(new AppError("Claim not found",400));
    }

    
    claim.status="rejected";
    await claim.save();

    const policyId=claim.policyId.toString();
    const policy=await Policy.findById(policyId);
    policy.isClaimed=false;
    await policy.save();

    return res.status(200).json({
      message:"Claim rejected successfully",
      claim
    });

    
  } catch (error) {
    return next(new AppError(error.message, 500));
    
  }
}