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
      policyHolder:user._id
    });

    user.policies.push(policy._id);
    // await policy.save();
    await user.save();


    
    return res.status(201).json({
      message: true,
      message: "policy purchased successfully",
      policy,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
