import mongoose from "mongoose";

const mentionsLegalesSchema = new mongoose.Schema({
  edition: { type: String },
  responsable: { type: String },
  hebergeur: { type: String },
  cnil: { type: String },
});

const mentionsLegalesModel = mongoose.model(
  "mentionsLegales",
  mentionsLegalesSchema
);
export default mentionsLegalesModel;
