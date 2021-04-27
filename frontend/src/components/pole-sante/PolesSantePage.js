import React from "react";
import Content from "../Content";
import Footer from "../Footer";
import Header from "../Header";
import "../../1-css/page.css";
import { Link } from "react-router-dom";

export default function PolesSante() {
  const appBar = {
    title: "Pôles Santé",
    links: [
      {
        id: "/mon-espace/admin/poles-sante/",
        name: "Liste des pôles",
      },
      {
        id: "/mon-espace/admin/poles-sante/ajouter-un-pole",
        name: "Ajouter un pôle",
      },
    ],
  };

  return (
    <div className="polessante-page page">
      <Header appBar={appBar} />
      <Content />
      {/*       <Footer />
       */}{" "}
    </div>
  );
}
