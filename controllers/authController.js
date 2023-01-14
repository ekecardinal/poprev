import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(3).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const register = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    throw new BadRequestError(error.details.map((msg) => msg.message));
  }
  const { fullName, email, password } = req.body;

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
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    throw new BadRequestError(error.details.map((msg) => msg.message));
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials");
  }

  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new UnAuthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

export { register, login };
