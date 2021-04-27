import express from "express";
import Specialite from "../models/Specialité.js";

const router = express.Router();

router.get("/all/:poleId", async (req, res) => {
  try {
    const specialites = await Specialite.find({ pole: req.params.poleId });

    res.status(200).send(specialites);
  } catch (error) {
    res
      .status(400)
      .send(
        "Impossible de récupérer les spécialités liées au pôle. Veuillez réessayer."
      );
  }
});

router.delete("/delete/:specialiteId", async (req, res) => {
  try {
    const specialiteDelete = await Specialite.findById(req.params.specialiteId);
    await specialiteDelete.remove();
    res.status(200).send(specialiteDelete);
  } catch (error) {
    res
      .status(400)
      .send("Impossible de supprimer la spécialité. Veuillez réessayer.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const specialite = await Specialite.findById(req.params.id);
    res.status(200).send(specialite);
  } catch (error) {
    res
      .status(400)
      .send("Impossible de récupérer les informations. Veuillez réessayer.");
  }
});

router.post("/", async (req, res) => {
  const specialite = new Specialite({
    pole: req.body.poleId,
    name: req.body.specialite.name,
    honoraires: req.body.specialite.honoraires,
    nombre: req.body.specialite.nombre,
    surfPropreProf: req.body.specialite.surfPropreProf,
    numbSalariesETP: req.body.specialite.numbSalariesETP,
  });
  console.log(specialite);
  try {
    const specialiteSaved = await specialite.save();
    res.status(200).send(specialiteSaved);
  } catch (error) {
    res
      .status(400)
      .send("Impossible d'ajouter cette spécialité. Veuillez réessayer.");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const specialite = await Specialite.findById(req.params.id);
    specialite.pole = req.body.pole;
    specialite.name = req.body.name;
    specialite.honoraires = req.body.honoraires;
    specialite.nombre = req.body.nombre;
    specialite.surfPropreProf = req.body.surfPropreProf;
    specialite.numbSalariesETP = req.body.numbSalariesETP;

    const updatedSpecialite = await specialite.save();
    res.status(200).send(updatedSpecialite);
  } catch (error) {
    res
      .status(400)
      .send("Merci de saisir une valeur pour l'ensemble des données.");
  }
});

export default router;
