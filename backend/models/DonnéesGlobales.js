import mongoose from "mongoose";

const trancheSchema = new mongoose.Schema({
  tranche1: {
    tranche1percent: { type: Number },
    tranche1point: { type: Number },
  },
  tranche2: {
    tranche2percent: { type: Number },
    tranche2point: { type: Number },
  },
  tranche3: {
    tranche3percent: { type: Number },
    tranche3point: { type: Number },
  },
  chargesSociales: { type: Number },
});

const metierSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  honoraires: {
    type: Number,
  },
});

const Metier = mongoose.model("metiers", metierSchema);
const Tranche = mongoose.model("tranchesCharges", trancheSchema);

export { Metier, Tranche };
