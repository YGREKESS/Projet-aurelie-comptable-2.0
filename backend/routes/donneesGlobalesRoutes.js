import express from "express";
import { Metier, Tranche } from "../models/DonnéesGlobales.js";
import MentionsLegales from "../models/MentionsLegales.js";
import path from "path";

const router = express.Router();

router.get("/metiers", async (req, res) => {
  try {
    const metiers = await Metier.find({});
    res.status(200).send(metiers);
  } catch (error) {
    res.status(400).send("Erreur lors de la récupération des métiers.");
  }
});

router.post("/metiers", async (req, res) => {
  const metier = new Metier({
    name: req.body.name,
    honoraires: req.body.honoraires,
  });
  try {
    const metierSaved = await metier.save();
    res.status(200).send(metierSaved);
  } catch (error) {
    res.status(400).send("Erreur lors de la sauvegarde du métier.");
  }
});

router.delete("/metiers/:metierId", async (req, res) => {
  try {
    const metier = await Metier.findById(req.params.metierId);
    console.log(metier);
    await metier.remove();
    res.status(200).send(metier);
  } catch (error) {
    res.status(400).send("Erreur lors de la suppression du métier.");
  }
});

router.put("/tranches", async (req, res) => {
  try {
    const tranche = await Tranche.findById("605a00f853fdcedea8740de5");
    tranche.tranche1 = {
      tranche1percent: req.body.tranche1.tranche1percent,
      tranche1point: req.body.tranche1.tranche1point,
    };
    tranche.tranche2 = {
      tranche2percent: req.body.tranche2.tranche2percent,
      tranche2point: req.body.tranche2.tranche2point,
    };
    tranche.tranche3 = {
      tranche3percent: req.body.tranche3.tranche3percent,
      tranche3point: req.body.tranche3.tranche3point,
    };
    tranche.chargesSociales = req.body.chargesSociales;

    const trancheSaved = await tranche.save();
    res.status(200).send(trancheSaved);
  } catch (error) {
    res.status(400).send("Erreur lors de la sauvegarde des données.");
  }
});

router.post("/tranches", async (req, res) => {
  const tranchesCharges = new Tranche({
    tranche1: {
      tranche1percent: req.body.tranche1.tranche1percent,
      tranche1point: req.body.tranche1.tranche1point,
    },
    tranche2: {
      tranche2percent: req.body.tranche2.tranche2percent,
      tranche2point: req.body.tranche2.tranche2point,
    },
    tranche3: {
      tranche3percent: req.body.tranche3.tranche3percent,
      tranche3point: req.body.tranche3.tranche3point,
    },
    chargesSociales: req.body.chargesSociales,
  });
  try {
    const tranchesChargesSaved = await tranchesCharges.save();
    res.status(200).send(tranchesChargesSaved);
  } catch (error) {
    res.status(400).send("Erreur lors de la sauvegarde des données.");
  }
});

router.get("/tranches", async (req, res) => {
  try {
    const tranchesCharges = await Tranche.findById("605a00f853fdcedea8740de5");
    res.status(200).send(tranchesCharges);
  } catch (error) {
    res.status(400).send("Erreur lors de la récupération des données.");
  }
});

router.get("/mentions-legales", async (req, res) => {
  try {
    const mentions = await MentionsLegales.find({});
    res.status(200).send(mentions);
  } catch (error) {
    res
      .status(400)
      .send("Erreur lors de la récupération des mentions légales.");
  }
});
router.post("/mentions-legales", async (req, res) => {
  const mentions = new MentionsLegales({
    edition: req.body.edition,
    responsable: req.body.responsable,
    hebergeur: req.body.hebergeur,
    cnil: req.body.cnil,
  });
  try {
    const mentionsSaved = await mentions.save();
    res.status(200).send(mentionsSaved);
  } catch (error) {
    res.status(400).send("Erreur lors de la sauvegarde des mentions légales.");
  }
});
router.put("/mentions-legales", async (req, res) => {
  try {
    const mentions = await MentionsLegales.findById("605fa48ecbcbeb2f530fd497");
    mentions.edition = req.body.edition;
    mentions.responsable = req.body.responsable;
    mentions.hebergeur = req.body.hebergeur;
    mentions.cnil = req.body.cnil;

    const mentionsSaved = await mentions.save();
    res.status(200).send(mentionsSaved);
  } catch (error) {
    res.status(400).send("Erreur lors de la sauvegarde des mentions légales.");
  }
});

router.get("/fiche-registre", async (req, res) => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "documents", "fiche-registre.png");
  res.download(filePath, "fiche-registre.png", (error) => {
    if (error) {
      return res
        .status(404)
        .send("Impossible de télécharger. Veuillez réessayer.");
    }
  });
});

export default router;
