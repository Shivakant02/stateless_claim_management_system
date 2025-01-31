import Policy from "../model/policy.model.js";
import User from "../model/user.model.js";

//perchase policy function
export const purchasePolicy = async(req, res,next) => {
  try {

    const {type,coverage,premium,policyHolder} = req.body;
    if (!type || !coverage || !premium || !policyHolder) {
      return next(new AppError("Please provide all required fields", 400));
    }

    const user=await User.findById(policyHolder);
    console.log(user);

    if(!user.login===true){
      return next(new AppError("Please login to continue", 400));
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
