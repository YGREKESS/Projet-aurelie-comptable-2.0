import express from "express";
import PoleSante from "../models/PoleSante.js";
import { poleValidation } from "../utils/validation.js";
import User from "../models/User.js";
import Declarations from "../models/Declarations.js";
import Specialites from "../models/Specialité.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const poles = await PoleSante.find();
    res.status(200).send(poles);
  } catch (error) {
    res.status(400).send("Impossible de récupérer l'ensemble des pôles.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pole = await PoleSante.findById(req.params.id);
    res.status(200).send(pole);
  } catch (error) {
    res.status(400).send("Impossible de récupérer les informations du pôle.");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const pole = await PoleSante.deleteOne({ _id: req.params.id });
    const declarations = await Declarations.deleteMany({
      type: "Pole",
      pole: req.params.id,
    });
    const specialites = await Specialites.deleteMany({
      pole: req.params.id,
    });
    res.status(200).send(pole);
  } catch (error) {
    res.status(400).send("Impossible de supprimer le pôle.");
  }
});

router.get("/:id/praticiens", async (req, res) => {
  try {
    const users = await User.find({ pole: req.params.id });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("Impossible de récupérer les praticiens du pôle.");
  }
});

router.post("/ajouter", async (req, res) => {
  const { error } = poleValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const poleSante = new PoleSante({
    name: req.body.name,
    address: req.body.address,
    postalCode: req.body.postalCode,
    city: req.body.city,
    surfaceTotale: req.body.surfaceTotale,
    surfaceCommuns: req.body.surfaceCommuns,
    loyerAnnuel: req.body.loyerAnnuel,
    loyerMensuelm2: req.body.loyerMensuelm2,
  });
  try {
    const savedPole = await poleSante.save();
    res.status(200).send(savedPole);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/update/:id", async (req, res) => {
  /*   const { error } = poleValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } */

  try {
    const pole = await PoleSante.findById(req.params.id);

    pole.name = req.body.name;
    pole.address = req.body.address;
    pole.postalCode = req.body.postalCode;
    pole.city = req.body.city;
    pole.surfaceTotale = req.body.surfaceTotale;
    pole.surfaceCommuns = req.body.surfaceCommuns;
    pole.loyerAnnuel = req.body.loyerAnnuel;
    pole.loyerMensuelm2 = req.body.loyerMensuelm2;

    const updatedPole = await pole.save();
    res.status(200).send(updatedPole);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
