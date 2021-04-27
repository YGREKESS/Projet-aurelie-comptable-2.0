import Content from "../Content";
import Header from "../Header";
import "../../1-css/page.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function MesDeclarations() {
  const appBar = {
    title: "Mes déclarations",
    links: [
      {
        id: "/mon-espace/mes-declarations/historique",
        name: "Historique",
      },
      {
        id: "/mon-espace/mes-declarations/saisir-une-declaration",
        name: "Saisir une déclaration",
      },
    ],
  };

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="mesdeclarations-page page">
      <Header appBar={appBar} />
      <Content />
    </div>
  );
}
