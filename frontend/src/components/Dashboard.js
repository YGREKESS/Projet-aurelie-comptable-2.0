import React, { useEffect } from "react";
import Navigator from "./Navigator";
import MonCompte from "./mon-compte/MonComptePage";
import MesDeclarations from "./mes-declarations/MesDeclarationsPage";
import { Route } from "react-router-dom";
import PolesSante from "./pole-sante/PolesSantePage";
import ListeUtilisateurs from "./liste-utilisateurs/ListeUtilisateursPage";
import "../1-css/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import DonneesGlobalesPage from "./donnees-globales/DonneesGlobalesPage";
import Cnil from "./cnil/CnilPage";
import Contact from "./home/ContactPage";
import { getInfos, userSuccessReset } from "../2-actions/userActions";
import Notifications, { notify } from "react-notify-toast";
import { getAllUsers } from "../2-actions/dataActions";

function Dashboard(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userLoginInfos } = userLogin;

  const userInfos = useSelector((state) => state.userInfos);
  const { loading: loadingUser, user, error: errorUser } = userInfos;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: userUpdateSuccess,
    userUpdate: userUpdateInfos,
    error: userUpdateError,
  } = userUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLoginInfos) {
      props.history.push("/connexion");
    }
    if (!user) {
      dispatch(getInfos(userLoginInfos._id, userLoginInfos.token));
    }
    if (userUpdateSuccess) {
      notify.show("Le profil a été mis à jour !", "success", 3000);
      if (userUpdateInfos._id === userLoginInfos._id) {
        dispatch(getInfos(userLoginInfos._id, userLoginInfos.token));
        dispatch(getAllUsers(userLoginInfos.token));
      } else {
        dispatch(getAllUsers(userLoginInfos.token));
      }
      dispatch(userSuccessReset());
    }
    if (userUpdateError) {
      notify.show(userUpdateError, "error", 3000);
    }
    return () => {};
  }, [userLoginInfos, userUpdateSuccess, userUpdateError]);
  return (
    userLoginInfos && (
      <div className="dashboard">
        <Notifications />
        <Navigator />
        {user ? (
          <div className="page-container">
            <Route path="/mon-espace/mon-compte" component={MonCompte} />
            <Route path="/mon-espace/contact" component={Contact} />
            <Route
              path="/mon-espace/mes-declarations"
              component={MesDeclarations}
            />
            <Route
              path="/mon-espace/admin/poles-sante"
              component={PolesSante}
            />
            <Route
              path="/mon-espace/admin/donnees-globales"
              component={DonneesGlobalesPage}
            />
            <Route
              path="/mon-espace/admin/liste-utilisateurs"
              component={ListeUtilisateurs}
            />
            <Route path="/mon-espace/admin/cnil" component={Cnil} />
          </div>
        ) : null}
      </div>
    )
  );
}

export default Dashboard;
