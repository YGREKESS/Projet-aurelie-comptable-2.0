import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  pole: {
    type: String,
    required: true,
  },
  specialite: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  firstname: {
    type: String,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: false,
    min: 6,
    max: 1024,
  },
  statut: {
    type: String,
    required: true,
    default: "Praticien",
  },
  phone: {
    type: String,
    max: 10,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
