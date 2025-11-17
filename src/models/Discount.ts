import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    maxUse: {
      type: Number,
      required: true,
    },
    uses: {
      type: Number,
      default: 0,
    },
    // user: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

const DiscountModel =
  mongoose.models.Discount || mongoose.model("Discount", schema);

export default DiscountModel;
