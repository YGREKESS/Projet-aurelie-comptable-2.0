import React from "react";
import Content from "../Content";
import Header from "../Header";

export default function Cnil() {
  const appBar = {
    title: "CNIL",
    links: [
      {
        id: "/mon-espace/admin/cnil/mentions-legales/",
        name: "Mentions légales",
      },
      {
        id: "/mon-espace/admin/cnil/fiche-registre/",
        name: "Fiche de registre",
      },
    ],
  };

  return (
    <div className="mentions-legales-page page">
      <Header appBar={appBar} />
      <Content />
    </div>
  );
}
