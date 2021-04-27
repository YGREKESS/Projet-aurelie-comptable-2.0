import Joi from "joi";

const registerValidation = (data) => {
  const schemaRegister = Joi.object({
    lastname: Joi.string().required().messages({
      "string.base": `Merci de saisir un nom valide.`,
      "string.empty": `Merci de saisir votre nom.`,
      "any.required": `Merci de saisir un nom.`,
    }),
    firstname: Joi.string().required().messages({
      "string.base": `Merci de saisir un prénom valide.`,
      "string.empty": `Merci de saisir votre prénom.`,
      "any.required": `Merci de saisir votre nom.`,
    }),
    pole: Joi.string().required().messages({
      "string.base": `Merci de sélectionner votre pôle.`,
      "string.empty": `Merci de sélectionner votre pôle.`,
      "any.required": `Merci de sélectionner votre pôle.`,
    }),
    email: Joi.string().required().email().messages({
      "string.base": `Merci de saisir une adresse email valide.`,
      "string.empty": `Merci de saisir votre adresse email.`,
      "string.email": `Merci de saisir une adresse email valide.`,
      "any.required": `Merci de saisir votre adresse email.`,
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": `Merci de saisir un mot de passe.`,
      "string.min": `Votre mot de passe doit contenir au moins 6 caractères.`,
      "any.required": `Merci de saisir un mot de passe.`,
    }),
    specialite: Joi.string(),
    statut: Joi.string(),
    phone: Joi.string(),
  });
  return schemaRegister.validate(data);
};

const updateValidation = (data) => {
  const schemaUpdate = Joi.object({
    _id: Joi.string(),
    lastname: Joi.string(),
    firstname: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().required().email().messages({
      "string.base": `Merci de saisir une adresse email valide.`,
      "string.empty": `Merci de saisir votre adresse email.`,
      "string.email": `Merci de saisir une adresse email valide.`,
      "any.required": `Merci de saisir votre adresse email.`,
    }),
    specialite: Joi.string(),
    pole: Joi.string(),
    statut: Joi.string(),
  });
  return schemaUpdate.validate(data);
};

const updatePasswordValidation = (data) => {
  const schemaUpdatePassword = Joi.object({
    _id: Joi.string(),
    userId: Joi.string(),
    password: Joi.string().messages({
      "string.empty": `Merci de saisir votre mot de passe.`,
    }),
    newpassword1: Joi.string().min(6).required().messages({
      "string.empty": `Merci de saisir votre nouveau mot de passe.`,
      "string.min": `Votre nouveau mot de passe doit contenir au moins 6 caractères.`,
      "any.required": `Merci de saisir votre nouveau mot de passe.`,
    }),
    newpassword2: Joi.string().min(6).required().messages({
      "string.empty": `Merci de confirmer votre mot de passe.`,
      "string.min": `Votre nouveau mot de passe doit contenir au moins 6 caractères.`,
      "any.required": `Merci de confirmer votre mot de passe.`,
    }),
  });
  return schemaUpdatePassword.validate(data);
};

const loginValidation = (data) => {
  const schemaRegister = Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": `Merci de saisir votre adresse email.`,
      "string.base": `Merci de saisir une adresse email valide.`,
      "string.email": `Merci de saisir une adresse email valide.`,
      "any.required": `Merci de saisir votre adresse email.`,
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": `Merci de saisir votre mot de passe.`,
      "string.min": `Votre mot de passe doit contenir au moins 6 caractères.`,
      "any.required": `Merci de saisir votre mot de passe.`,
    }),
  });
  return schemaRegister.validate(data);
};

const poleValidation = (data) => {
  const schemaRegister = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": `Merci de saisir le nom du pôle.`,
      "string.base": `Merci de saisir un nom valide.`,
      "any.required": `Merci de saisir le nom du pôle.`,
    }),
    address: Joi.string().required().messages({
      "string.empty": `Merci de saisir une adresse.`,
      "string.base": `Merci de saisir une adresse valide.`,
      "any.required": `Merci de saisir une adresse.`,
    }),
    postalCode: Joi.number().required().messages({
      "number.empty": `Merci de saisir un code postal.`,
      "number.base": `Merci de saisir un code postal valide.`,
      "any.required": `Merci de saisir un code postal.`,
    }),
    city: Joi.string().required().messages({
      "string.empty": `Merci de saisir une ville.`,
      "string.base": `Merci de saisir un nom de ville cohérent.`,
      "any.required": `Merci de saisir une ville.`,
    }),
    surfaceTotale: Joi.number().required().messages({
      "number.empty": `Merci de saisir la surface totale du pôle.`,
      "number.base": `Merci de saisir une surface totale cohérente.`,
      "any.required": `Merci de saisir la surface totale du pôle.`,
    }),
    surfaceCommuns: Joi.number().required().messages({
      "number.empty": `Merci de saisir la surface communs du pôle.`,
      "number.base": `Merci de saisir une surface communs cohérente.`,
      "any.required": `Merci de saisir la surface communs du pôle.`,
    }),
    loyerAnnuel: Joi.number().required().messages({
      "number.empty": `Merci de saisir le loyer annuel du pôle.`,
      "number.base": `Merci de saisir un loyer annuel cohérent.`,
      "any.required": `Merci de saisir le loyer annuel du pôle.`,
    }),
    loyerMensuelm2: Joi.number(),
  });
  return schemaRegister.validate(data);
};

export {
  registerValidation,
  loginValidation,
  poleValidation,
  updateValidation,
  updatePasswordValidation,
};
