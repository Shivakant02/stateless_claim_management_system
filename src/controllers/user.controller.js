import User from "../model/user.model.js";
import AppError from "../utils/AppError.js"

//cookie options
const cookieOptions = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

//signup funtion
export const signup = async (req, res,next) => {
  try {
    const { fullname, email, password } = req.body;
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
    // console.log(req.user);
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