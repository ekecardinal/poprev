import Project from "../models/Project.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";

const createProject = async (req, res) => {
  const { artist, title, amount, token } = req.body;
  if (!artist || !title || !amount || !token) {
    throw new BadRequestError("Please provide all values");
  }

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
