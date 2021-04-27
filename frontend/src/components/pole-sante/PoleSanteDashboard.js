import React, { useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import PoleAnalyse from "./analyse/PoleAnalyse";
import PoleDeclarations from "./declarations/PoleDeclarations";
import PoleInfos from "./infos/PoleInfos";
import PoleSanteHeader from "./PoleSanteHeader";
import PoleSpecialites from "./specialites/PoleSpecialites";
import { useDispatch, useSelector } from "react-redux";
import { getOnePole } from "../../2-actions/poleActions";
import PolePraticiens from "./praticiens/PolePraticiens";
import {
  resetDeclarationSelected,
  resetPoleDeclarations,
} from "../../2-actions/declarationActions";
import { resetPoleSpecialites } from "../../2-actions/specialiteActions";
import Notifications, { notify } from "react-notify-toast";

export default function PoleSanteDashboard() {
  const { id } = useParams();

  const poleSelected = useSelector((state) => state.poleSelected);
  const { loading, pole, error } = poleSelected;

  const poleUpdated = useSelector((state) => state.poleUpdated);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = poleUpdated;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!pole || pole._id !== id) {
      dispatch(getOnePole(id));
    }
    if (successUpdate) {
      notify.show(
        "Les modifications ont été enregistrées !",
        "success",
        5000,
        "#0E1717"
      );
    }
    if (errorUpdate) {
      notify.show(errorUpdate, "error", 5000, "#0E1717");
    }
    return () => {
      dispatch(resetDeclarationSelected());
    };
  }, [pole, successUpdate]);

  return (
    <div className="pole-sante-dashboard">
      <Notifications />
      <PoleSanteHeader poleId={id} />
      {pole ? (
        <Route
          path={`/mon-espace/admin/poles-sante/pole=:id/infos-generales`}
          render={() => <PoleInfos pole={pole} />}
        />
      ) : null}
      <Route
        path={`/mon-espace/admin/poles-sante/pole=:id/declarations`}
        component={PoleDeclarations}
      />
      <Route
        path={`/mon-espace/admin/poles-sante/pole=:id/specialites`}
        component={PoleSpecialites}
      />
      <Route
        path={`/mon-espace/admin/poles-sante/pole=:id/analyse`}
        component={PoleAnalyse}
      />
      <Route
        path={`/mon-espace/admin/poles-sante/pole=:id/praticiens`}
        component={PolePraticiens}
      />
    </div>
  );
  /*   ); */
}
