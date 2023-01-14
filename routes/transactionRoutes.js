import express from "express";
import {
  createTransaction,
  getUserTransaction,
  getProjectTransaction,
  getOneTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

// router.route("/").post(createTransaction);
router.route("/").get(getUserTransaction);
router.route("/:id").post(createTransaction).get(getProjectTransaction);
router.route("/tran/:id").get(getOneTransaction);

export default router;
