import Project from "../models/Project.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

import Joi from "joi";

const projectSchema = Joi.object({
  artist: Joi.string().required(),
  title: Joi.string().required(),
  amount: Joi.number().required(),
  token: Joi.number().required(),
});

const createProject = async (req, res) => {
  const { error, value } = projectSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    throw new BadRequestError(error.details.map((msg) => msg.message));
  }
  const { artist, title, amount, token } = req.body;

  const pricePerToken = amount / token;
  const availableToken = token;
  const project = await Project.create({
    artist,
    title,
    amount,
    token,
    availableToken,
    pricePerToken,
  });

  res.status(StatusCodes.CREATED).json({ project });
};

const getAllProject = async (req, res) => {
  const projects = await Project.find();
  res.status(StatusCodes.OK).json({ projects });
};

export { createProject, getAllProject };
