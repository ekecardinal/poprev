import Transaction from "../models/Transaction.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import Project from "../models/Project.js";

import Joi from "joi";

const transactionSchema = Joi.object({
  projectName: Joi.string().required(),
  projectTitle: Joi.string().required(),
  numberOfToken: Joi.number().required(),
  amount: Joi.number().required(),
});

const createTransaction = async (req, res) => {
  const { error, value } = transactionSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    throw new BadRequestError(error.details.map((msg) => msg.message));
  }
  const { numberOfToken, projectName, projectTitle, amount } = req.body;

  const id = req.params.id;
  const userId = req.user.userId;
  const project = await Project.findOne({ _id: id });
  if (project.availableToken < numberOfToken) {
    throw new BadRequestError("cant buy above available token");
  }
  const availableToken = project.availableToken - numberOfToken;
  //   console.log(userId);

  const transaction = await Transaction.create({
    numberOfToken,
    projectId: id,
    projectName,
    projectTitle,
    amount,
    userId,
  });
  res.status(StatusCodes.CREATED).json({ transaction });

  await Project.findOneAndUpdate(
    { _id: id },
    { $set: { availableToken: availableToken } },
    { new: true }
  );
};

const getUserTransaction = async (req, res) => {
  const userId = req.user.userId;
  const transactions = await Transaction.find({ userId: userId });
  res.status(StatusCodes.OK).json({ transactions });
};

const getProjectTransaction = async (req, res) => {
  const projectId = req.params.id;
  const transactions = await Transaction.find({ projectId });
  res.status(StatusCodes.OK).json({ transactions });
};

const getOneTransaction = async (req, res) => {
  const id = req.params.id;
  const transaction = await Transaction.findOne({ _id: id });
  res.status(StatusCodes.OK).json({ transaction });
};

export {
  createTransaction,
  getUserTransaction,
  getProjectTransaction,
  getOneTransaction,
};
