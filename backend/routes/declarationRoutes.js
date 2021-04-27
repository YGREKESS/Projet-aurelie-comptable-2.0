import express from "express";
import User from "../models/User.js";
import Pole from "../models/PoleSante.js";
import Declaration from "../models/Declarations.js";
import mailgun from "mailgun-js";
import dotenv from "dotenv";
import { templateDeclaPostedEmail } from "../utils/template.js";

dotenv.config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const router = express.Router();

router.get("/all/:poleId", async (req, res) => {
  try {
    const declarations = await Declaration.find({ pole: req.params.poleId });
    res.status(200).send(declarations);
  } catch (error) {
    res
      .status(400)
      .send(
        "Erreur lors de la récupération des déclarations. Veuillez réessayer."
      );
  }
});

router.delete("/delete/:declarationId", async (req, res) => {
  try {
    const declarationDelete = await Declaration.findById(
      req.params.declarationId
    );
    await declarationDelete.remove();
    res.status(200).send(declarationDelete);
  } catch (error) {
    res
      .status(400)
      .send("Impossible de supprimer la déclaration. Veuillez réessayer.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const declaration = await Declaration.findById(req.params.id);
    res.status(200).send(declaration);
  } catch (error) {
    res
      .status(400)
      .send(
        "Erreur lors de la récupération de la déclaration. Veuillez réessayer."
      );
  }
});

router.put("/seen/:id", async (req, res) => {
  try {
    const declaration = await Declaration.findById(req.params.id);
    declaration.seen = true;
    const declarationUpdated = declaration.save();
    res.status(200).send(declarationUpdated);
  } catch (error) {
    res
      .status(400)
      .send(
        "Impossible de mettre à jour le statut 'seen'. Veuillez réessayer."
      );
  }
});

router.post("/add", async (req, res) => {
  const declaration = new Declaration({
    pole: req.body.declaration.pole ? req.body.declaration.pole : null,
    user: req.body.declaration.user ? req.body.declaration.user : null,
    title: req.body.declaration.title,
    type: req.body.declaration.type,
    charges: req.body.declaration.charges,
  });
  console.log(req.body.declaration);
  console.log(declaration);
  try {
    const savedDeclaration = await declaration.save();
    if (req.body.declaration.user) {
      const user = await User.findById(req.body.declaration.user);
      const pole = await Pole.findById(user.pole);
      const data = {
        from: `YOU@YOUR_DOMAIN_NAME.COM`,
        to: "youssef.segh@hotmail.fr",
        subject: `Une nouvelle déclaration vient d'être mise en ligne !`,
        html: templateDeclaPostedEmail(user, pole),
      };
      mg.messages().send(data, function (error, body) {
        if (error) {
          return res
            .status(400)
            .send("Impossible d'envoyer l'email de confirmation.");
        }
      });
    }
    res.status(200).send(savedDeclaration);
  } catch (error) {
    res.status(400).send("Erreur lors de la sauvegarde de la déclaration.");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const declaration = await Declaration.findById(req.params.id);
    declaration.pole = req.body.pole;
    declaration.title = req.body.title;
    declaration.charges = req.body.charges;

    const updatedDeclaration = declaration.save();
    res.status(200).send(updatedDeclaration);
  } catch (error) {
    res.status(400).send("Erreur lors de la modification de la déclaration.");
  }
});

export default router;
