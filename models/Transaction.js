import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Please provide user"],
    },
    numberOfToken: {
      type: Number,
      required: [true, "Please provide number of token to buy"],
      maxlength: 10,
    },
    projectId: {
      type: String,
      required: [true, "Please provide project"],
    },
    projectName: {
      type: String,
      required: [true, "Please provide name"],
    },
    projectTitle: {
      type: String,
      required: [true, "Please provide title"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
