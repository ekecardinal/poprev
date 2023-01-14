import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new BadRequestError("Email already Exists");
  }
  const user = await User.create({ fullName, email, password });

  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { email: user.email, fullName: user.fullName }, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }
  console.log(user);

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new UnAuthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

export { register, login };
