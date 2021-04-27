import React from "react";
import { Route } from "react-router-dom";
import "../1-css/Content.css";
import PoleSanteDashboard from "./pole-sante/PoleSanteDashboard";
import UserInfosPage from "./mon-compte/UserInfosPage";
import FormPasswordUpdate from "./mon-compte/FormPasswordUpdate";
import MesDeclarations from "./mes-declarations/MesDeclarationsContainer";
import ListeUtilisateurs from "./liste-utilisateurs/ListeUtilisateursContainer";
import SaisirDeclaration from "./mes-declarations/SaisirDeclaration";
import PolesSante from "./pole-sante/PolesSanteContainer";
import AddPoleSante from "./pole-sante/AddPoleSante";
import DonneesGlobales from "./donnees-globales/DonneesGlobalesContainer";
import MentionLegales from "./cnil/MentionLegales";
import FicheRegistre from "./cnil/FicheRegistre";
import ContactForm from "./home/ContactForm";

function Content() {
  return (
    <div className="content">
      <Route path="/mon-espace/mon-compte/" exact component={UserInfosPage} />
      <Route
        path="/mon-espace/contact/"
        exact
        render={() => <ContactForm auth={true} from={false} />}
      />
      <Route
        path="/mon-espace/mes-declarations/historique"
        exact
        component={MesDeclarations}
      />
      <Route
        path="/mon-espace/mon-compte/modifier-mot-de-passe"
        component={FormPasswordUpdate}
      />
      <Route
        path="/mon-espace/admin/cnil/mentions-legales"
        component={MentionLegales}
      />
      <Route
        path="/mon-espace/admin/cnil/fiche-registre"
        component={FicheRegistre}
      />
      <Route
        path="/mon-espace/mes-declarations"
        exact
        component={MesDeclarations}
      />
      <Route
        path="/mon-espace/mes-declarations/saisir-une-declaration"
        exact
        component={SaisirDeclaration}
      />
      <Route
        path="/mon-espace/admin/poles-sante/"
        exact
        component={PolesSante}
      />
      <Route
        path="/mon-espace/admin/liste-utilisateurs"
        exact
        component={ListeUtilisateurs}
      />
      <Route
        path="/mon-espace/admin/donnees-globales"
        exact
        component={DonneesGlobales}
      />
      <Route
        path="/mon-espace/admin/poles-sante/ajouter-un-pole"
        exact
        component={AddPoleSante}
      />
      <Route
        path="/mon-espace/admin/poles-sante/pole=:id"
        component={PoleSanteDashboard}
      />
    </div>
  );
}

export default Content;
