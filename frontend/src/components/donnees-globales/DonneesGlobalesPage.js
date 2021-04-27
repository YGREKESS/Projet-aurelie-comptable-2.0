import React from "react";
import Content from "../Content";
import Header from "../Header";

export default function DonneesGlobales() {
  const appBar = {
    title: "Données globales",
    links: [
      {
        id: "/mon-espace/admin/donnees-globales/",
        name: "Données globales",
      },
    ],
  };

  return (
    <div className="donnees-globales-page page">
      <Header appBar={appBar} />
      <Content />
    </div>
  );
}
