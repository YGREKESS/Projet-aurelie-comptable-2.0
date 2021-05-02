import express from "express";
import User from "../models/User.js";
import Declaration from "../models/Declarations.js";
import { isAdmin, isAuth } from "../utils/authentification.js";
import {
  updateValidation,
  updatePasswordValidation,
} from "../utils/validation.js";
import bcrypt from "bcrypt";
import { registerValidation } from "../utils/validation.js";
import mailgun from "mailgun-js";
import dotenv from "dotenv";
import {
  templateContactEmail,
  templateDemandeDeclaEmail,
  templatePasswordForgetEmail,
} from "../utils/template.js";

dotenv.config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).send(users);
    } else {
      res.status(400).send("Aucun utilisateur trouvé !");
    }
  } catch (error) {
    res.status(400).send("Aucun utilisateur trouvé !");
  }
});

router.get("/get-infos/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send("Aucun utilisateur trouvé !");
    }
  } catch (error) {
    res.status(400).send("Aucun utilisateur trouvé !");
  }
});

router.delete("/delete-user/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    const declarations = await Declaration.deleteMany({ user: req.params.id });
    res.status(200).send("L'utilisateur a été supprimé !");
  } catch (error) {
    res.status(400).send("Impossible de supprimer l'utilisateur !");
  }
});

router.put("/update-user", isAuth, async (req, res) => {
  console.log(req.body);
  const { error } = updateValidation(req.body.user);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const user = await User.findById(req.body.user._id);
    if (user) {
      user.lastname = req.body.user.lastname;
      user.firstname = req.body.user.firstname;
      user.email = req.body.user.email;
      user.phone = req.body.user.phone;
      user.pole = req.body.user.pole;
      user.specialite = req.body.user.specialite;
      user.statut = req.body.user.statut;
      const updatedUser = await user.save();
      res.status(200).send({
        message: "Votre profil a été mis à jour.",
        userUpdate: updatedUser,
      });
    } else {
      res.status(400).send("Aucun utilisateur trouvé !");
    }
  } catch (error) {
    res.status(400).send("Aucun utilisateur trouvé !");
  }
});

router.get("/declarations/:userId", async (req, res) => {
  try {
    const declarations = await Declaration.find({ user: req.params.userId });
    res.status(200).send(declarations);
  } catch (error) {
    res
      .status(400)
      .send(
        "Erreur lors de la récupération des déclarations. Veuillez réessayer."
      );
  }
});

router.put("/update-password", async (req, res) => {
  if (req.body.password.newpassword1 !== req.body.password.newpassword2) {
    return res
      .status(400)
      .send("Merci de saisir deux nouveaux mots de passe identiques.");
  }
  const { error } = updatePasswordValidation(req.body.password);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Recup user profile
  try {
    const user = await User.findById(req.body.password.userId);
    if (user) {
      if (req.body.password.password) {
        //Checking password
        const validPassword = await bcrypt.compareSync(
          req.body.password.password,
          user.password
        );
        if (!validPassword) {
          return res.status(400).send("Mot de passe invalide.");
        }
      }
      //Hash the password
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(
        req.body.password.newpassword2,
        salt
      );

      user.password = hashedPassword;
      const passwordUpdated = await user.save();
      return res.status(200).send("Votre mot de passe a été mis à jour.");
    }
  } catch (error) {
    return res.status(400).send("Utilisateur introuvable.");
  }
});

router.post("/create-user", isAuth, isAdmin, async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //checking if user already in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(200).send(emailExist);
  }
  //Hash the password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    pole: req.body.pole,
    statut: req.body.statut,
    email: req.body.email,
    phone: req.body.phone,
    password: hashedPassword,
    specialite: req.body.specialite,
  });
  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/send-email", async (req, res) => {
  console.log(req.body);
  let emailHtml = "";
  switch (req.body.subject) {
    case "Lien de rédaction de votre déclaration.":
      emailHtml = templateDemandeDeclaEmail(req.body.user);
      break;
    case "Demande d'information.":
      emailHtml = templateContactEmail(req.body.message);
      break;
    case "Mot de passe oublié.":
      try {
        const user = await User.findOne({ email: req.body.email });
        emailHtml = templatePasswordForgetEmail(user);
      } catch (error) {
        return res.status(400).send("Cette adresse email est inconnue.");
      }
      break;
    default:
      break;
  }

  const data = {
    from: `YOU@YOUR_DOMAIN_NAME.COM`,
    to: `${req.body.to ? req.body.to : "youssef.seghrouchni79@gmail.com"}`,
    subject: `${req.body.subject}`,
    html: emailHtml,
  };
  mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
      return res.status(400).send("Impossible d'envoyer ce message.");
    }
    return res.status(200).send("Email envoyé à l'utilisateur.");
  });
});

export default router;
