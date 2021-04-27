import React from "react";
import Content from "../Content";
import Header from "../Header";
import "../../1-css/page.css";

export default function MonCompte() {
  const appBar = {
    title: "Mon compte",
    links: [
      {
        id: "/mon-espace/mon-compte/",
        name: "Informations personnelles",
      },
      {
        id: "/mon-espace/mon-compte/modifier-mot-de-passe",
        name: "Modifier mon mot de passe",
      },
    ],
  };

  return (
    <div className="moncompte-page page">
      <Header appBar={appBar} />
      <Content />
    </div>
  );
}
