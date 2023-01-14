import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
      required: [true, "Please provide artist"],
      maxlength: 30,
    },
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: 30,
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount"],
    },
    token: {
      type: Number,
      required: [true, "Please provide amount of token"],
    },
    availableToken: {
      type: Number,
      required: [true, "Please provide amount of token"],
    },

    pricePerToken: {
      type: Number,
      required: [true, "Please provide price per token"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
