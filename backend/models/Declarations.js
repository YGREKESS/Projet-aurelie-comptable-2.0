import mongoose from "mongoose";

const declarationSchema = new mongoose.Schema({
  pole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "poleSante",
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  title: { type: String, required: false },
  type: { type: String, required: true },
  seen: { type: Boolean, required: true, default: false },
  charges: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const declarationModel = mongoose.model("declaration", declarationSchema);
export default declarationModel;
