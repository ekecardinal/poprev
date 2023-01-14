import express from "express";
import {
  createProject,
  getAllProject,
} from "../controllers/projectsController.js";

const router = express.Router();

router.route("/").post(createProject).get(getAllProject);

export default router;
