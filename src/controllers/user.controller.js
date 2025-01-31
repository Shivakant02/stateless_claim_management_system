import User from "../model/user.model.js";

//signup funtion
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    const user = await User.create({
      email: email,
      password: password,
      fullname: fullname,
    });

    await user.save();

    // const jwtToken = await user.generateJWTToken();

    // user.password = undefined;

    // res.cookie("token", jwtToken, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

