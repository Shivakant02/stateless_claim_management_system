import User from "../model/user.model.js";
import AppError from "../utils/AppError.js";

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
    user.password = undefined;

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
    console.log(user)
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid credentials", 401));
    }

    user.login = true;
    await user.save();

    user.password = undefined;

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: user
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

