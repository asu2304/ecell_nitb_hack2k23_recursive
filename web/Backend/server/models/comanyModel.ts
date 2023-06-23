import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    org: {
      type: String,
      required: [true, "Please add your category"],
      trim: true,
      unique: true,
      maxLength: [50, "Name is up to 50 chars long."],
    },
    email: {
      type: String,
      required: [true, "Please add your Bank account no"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add your category"],
      trim: true,
      unique: true,
      maxLength: [50, "Name is up to 50 chars long."],
    },
    plan: {
      type: String,
      trim: true,
      default: "free",
    },
    apicount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("company", companySchema);
