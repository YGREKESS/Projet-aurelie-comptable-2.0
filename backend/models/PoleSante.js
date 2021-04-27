import mongoose from "mongoose";

const poleSanteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: Number, required: true },
  city: { type: String, required: true },
  surfaceTotale: { type: Number, required: true },
  surfaceCommuns: { type: Number, required: true },
  loyerAnnuel: { type: Number, required: true },
  loyerMensuelm2: { type: Number },
  date: {
    type: Date,
    default: Date.now,
  },
});

const poleSanteModel = mongoose.model("poleSante", poleSanteSchema);
export default poleSanteModel;
