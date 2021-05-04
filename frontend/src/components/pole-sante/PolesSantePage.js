import React, { useEffect } from "react";
import Content from "../Content";
import Footer from "../Footer";
import Header from "../Header";
import "../../1-css/page.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPraticiensReset } from "../../2-actions/poleActions";
import { resetDeclarationSelected } from "../../2-actions/declarationActions";

export default function PolesSante() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(getPraticiensReset());
      dispatch(resetDeclarationSelected());
    };
  }, []);

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
