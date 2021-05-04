import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send("Token invalide.");
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send("Aucun token.");
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.statut === "Administrateur") {
    return next();
  }
  return res.status(401).send('Token "Admin" n\'est pas valide.');
};

export { isAuth, isAdmin };
