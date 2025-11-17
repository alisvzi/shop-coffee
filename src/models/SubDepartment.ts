import mongoose from "mongoose";
import "./Department";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const subdepartmentModel =
  mongoose.models.SubDepartment || mongoose.model("SubDepartment", schema);

export default subdepartmentModel;
