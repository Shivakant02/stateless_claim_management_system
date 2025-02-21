import Claim from '../model/claim.model.js';
import AppError from '../utils/AppError.js';
import Policy from '../model/policy.model.js';
import ClaimHistory from '../model/claimHistory.model.js';
import { sendClaimApprovedEmail, sendClaimRejectedEmail } from '../utils/sendEmails.js';

export const approveClaim = async (req, res,next) => {
  try {
    const userId=req.user.id;
    if(!userId){
      return next(new AppError("Unauthorized,please login to continue",401));
    }

    const claimId=req.params.id
    const claim=await Claim.findById(claimId).populate("policyHolder");
    // console.log(claim)
    if(!claim){
      return next(new AppError("Claim not found",400));
    }

    if(claim.status==="approved"){
      return next(new AppError("Claim already approved",400));
    }

    const email=claim.policyHolder.email;
    claim.status="approved";
    const claimHistory = await ClaimHistory.findOne();
    claimHistory.pendingClaims = claimHistory.pendingClaims.filter(id => id.toString() !== claim._id.toString());
    if (!claimHistory.approvedClaims.includes(claim._id)) {
      claimHistory.approvedClaims.push(claim._id);
    }
    await claimHistory.save();
    await claim.save();

    await sendClaimApprovedEmail(email, claim._id);
    return res.status(200).json({
      success:true,
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
    const claim=await Claim.findById(claimId).populate("policyHolder");
    if(!claim){
      return next(new AppError("Claim not found",400));
    }

    if(claim.status==="rejected"){
      return next(new AppError("Claim already rejected",400));
    }

    
    claim.status="rejected";
    const claimHistory = await ClaimHistory.findOne();
    claimHistory.pendingClaims = claimHistory.pendingClaims.filter(id => id.toString() !== claim._id.toString());
    if (!claimHistory.rejectedClaims.includes(claim._id)) {
      claimHistory.rejectedClaims.push(claim._id);
    }
    await claimHistory.save();
    await claim.save();

    const policyId=claim.policyId.toString();
    const policy=await Policy.findById(policyId);
    await policy.save();

    const email=claim.policyHolder.email;

    await sendClaimRejectedEmail(email, claim._id);
    return res.status(200).json({
      success:true,
      message:"Claim rejected successfully",
      claim
    });

    
  } catch (error) {
    return next(new AppError(error.message, 500));
    
  }
}

//get all pending claims
export const fetchAllClaims = async (req, res,next) => {
  try {
    const userId=req.user.id;
    if(!userId){
      return next(new AppError("Unauthorized,please login to continue",401));
    }

  const allClaims=await ClaimHistory.findOne()
  .populate("pendingClaims")
  .populate("approvedClaims")
  .populate("rejectedClaims");
    return res.status(200).json({
      success:true,
      message:"All claims",
      allClaims:allClaims
    });

    
  } catch (error) {
    return next(new AppError(error.message, 500));
    
  }
}

// approve multiple
export const approveMultipleClaims = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return next(new AppError("Unauthorized, please login to continue", 401));
    }

    const { claimIds } = req.body; // Expecting an array of claim IDs

    if (!claimIds || !Array.isArray(claimIds) || claimIds.length === 0) {
      return next(new AppError("Please provide an array of claim IDs", 400));
    }

    // Find all claims that need to be approved
    const claims = await Claim.find({ _id: { $in: claimIds } }).populate("policyHolder");

    if (claims.length === 0) {
      return next(new AppError("No valid claims found", 400));
    }

    // Filter out already approved claims
    const claimsToApprove = claims.filter(claim => claim.status !== "approved");

    if (claimsToApprove.length === 0) {
      return next(new AppError("All provided claims are already approved", 400));
    }

    // Update claim statuses and collect emails
    const emails = [];
    for (let claim of claimsToApprove) {
      claim.status = "approved";
      emails.push(claim.policyHolder.email);
      await claim.save();
    }

    // Update claim history
    const claimHistory = await ClaimHistory.findOne();
    claimHistory.pendingClaims = claimHistory.pendingClaims.filter(
      id => !claimIds.includes(id.toString())
    );
    claimHistory.approvedClaims = [
      ...new Set([...claimHistory.approvedClaims, ...claimsToApprove.map(claim => claim._id)])
    ];
    await claimHistory.save();

    // Send approval emails (optional)
    for (let i = 0; i < claimsToApprove.length; i++) {
      await sendClaimApprovedEmail(emails[i], claimsToApprove[i]._id);
    }

    return res.status(200).json({
      success: true,
      message: `${claimsToApprove.length} claims approved successfully`,
      approvedClaims: claimsToApprove
    });

  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
