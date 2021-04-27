import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import {
  registerValidation,
  loginValidation,
  updatePasswordValidation,
} from "../utils/validation.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isAuth } from "../utils/authentification.js";
import mailgun from "mailgun-js";
import { templatePasswordForgetEmail } from "../utils/template.js";

dotenv.config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //checking if user already in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Cette adresse email a déjà été enregistrée.");
  }
  //Hash the password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

  const user = new User({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    pole: req.body.pole,
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

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Checking if email is already in DB
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email ou mot de passe incorrect.");
  }
  //Checking password
  const validPassword = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!validPassword) {
    return res.status(400).send("Mot de passe invalide.");
  }

  //Create and assign a token
  const token = jwt.sign(
    {
      _id: user._id,
      lastname: user.lastname,
      firstname: user.firstname,
      statut: user.statut,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).status(200).send({
    _id: user._id,
    lastname: user.lastname,
    firstname: user.firstname,
    email: user.email,
    token: token,
  });
});

router.put("/password-forget/password-update/:id", async (req, res) => {
  console.log(req.body.password);
  if (req.body.password.newpassword1 !== req.body.password.newpassword2) {
    return res
      .status(400)
      .send("Merci de saisir deux mots de passe identiques.");
  }
  const { error } = updatePasswordValidation(req.body.password);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  //Recup user profile
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      //Hash the password
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(
        req.body.password.newpassword2,
        salt
      );

      user.password = hashedPassword;
      const passwordUpdated = await user.save();
      return res.status(200).send("Votre mot de passe a été mis à jour.");
    } else {
      return res.status(400).send("Utilisateur introuvable.");
    }
  } catch (error) {
    return res.status(400).send("Utilisateur introuvable.");
  }
});

export default router;
