import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <NavLink to={"/connexion"}>Inscription/Connexion</NavLink>
      <NavLink to="/formulaire-de-contact">Contact</NavLink>
      <NavLink to="/mentions-legales">Mentions légales</NavLink>
    </div>
  );
}
