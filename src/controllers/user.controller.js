import User from "../model/user.model.js";
import AppError from "../utils/AppError.js"
import { sendPasswordResetEmail } from "../utils/sendEmails.js";
import crypto from "crypto";

//cookie options
const cookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: false,
  secure: true,
  sameSite: "none",
};

//signup funtion
export const signup = async (req, res,next) => {
  try {
    const { fullname, email, password,dateOfBirth,gender } = req.body;
    if (!fullname || !password || !email) {
      return next(new AppError("Please provide all required fields", 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError("User already exists", 400));
    }

    const user = await User.create({
      email: email,
      password: password,
      fullname: fullname,
      dateOfBirth:dateOfBirth,
      gender:gender
    });

    await user.save();

    const token = await user.generateJWTToken();

    user.password = undefined;

    res.cookie("token", token, cookieOptions);
    
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));  
  }
};

//signin function
export const signin = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide all required fields", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    // console.log(user)
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid credentials", 401));
    }

    // user.login = true;
    await user.save();
    const token = await user.generateJWTToken();    
    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

//get user profile
export const getUserProfile = async (req, res,next) => {
  try {
    const userId = req.user.id;
    console.log(req.user);
    const user = await User.findById(userId);
    if (!user) {
      return next(new AppError("User not found", 400));
    }

    user.password = undefined;
    return res.status(200).json({
      success: true,
      user,
    });
    
  } catch (error) {
    return next(new AppError(error.message, 500));
    
  }
}
  

//logout function
export const logout = async (req, res,next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//forgot password function
export const forgotPassword = async (req, res,next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new AppError("Please provide email", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const resetToken = await user.generateResetPasswordToken();
    await user.save();

   await sendPasswordResetEmail(email, resetToken);

    return res.status(200).json({
      success: true,
      message: `Reset password link sent to ${email}`,
      resetToken
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

//reset password function

export const resetPassword = async (req, res,next) => {
  try {
    const {newPassword } = req.body;
    const {resetToken}=req.params;
    console.log(newPassword,resetToken)
    if (!resetToken || !newPassword) {
      return next(new AppError("Please provide all required fields", 400));
    }

    const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("Invalid or expired reset token", 400));
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};