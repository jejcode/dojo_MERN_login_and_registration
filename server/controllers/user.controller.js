import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.json(users)
};

const registerUser = async (req, res) => {
  try {
    console.log("incoming request:", req.body);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "Email already exists. Please login." });
    } else {
      const newUser = await User.create(req.body);
      console.log("register:", newUser);
      const userToken = jwt.sign(
        {
          _id: newUser._id,
          email: newUser.email,
        },
        secret,
        { expiresIn: "2h" }
      );

      res
        .status(200)
        .cookie("userToken", userToken, { httpOnly: true, maxAge: 7200000 })
        .json({ newUser, userToken });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
export { getAllUsers, registerUser };
