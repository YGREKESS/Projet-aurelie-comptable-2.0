import React from "react";
import Content from "../Content";
import Header from "../Header";
import "../../1-css/page.css";

export default function ListeUtilisateurs() {
  const appBar = {
    title: "Liste utilisateurs",
    links: [
      {
        id: "/mon-espace/admin/liste-utilisateurs/",
        name: "Liste des utilisateurs",
      },
    ],
  };

  return (
    <div className="listeutilisateurs-page page">
      <Header appBar={appBar} />
      <Content />
      {/*       <Footer />
       */}{" "}
    </div>
  );
}
