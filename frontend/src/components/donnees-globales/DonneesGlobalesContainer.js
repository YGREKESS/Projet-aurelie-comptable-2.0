import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTranches,
  resetSuccessTranche,
} from "../../2-actions/DonneeGlobaleActions";
import ChargesSociales from "./ChargesSociales";
import ListeMetiers from "./ListeMetiers";
import TsTranche from "./TsTranche";
import Notifications, { notify } from "react-notify-toast";

export default function DonneesGlobales() {
  const dispatch = useDispatch();

  const tranchesGet = useSelector((state) => state.tranchesGet);
  const { loading, tranches, error } = tranchesGet;

  const trancheUpdate = useSelector((state) => state.trancheUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = trancheUpdate;

  useEffect(() => {
    if (!tranches) {
      dispatch(getTranches());
    }
    if (successUpdate) {
      notify.show("Donnée mis à jour !", "success", 3000);
      dispatch(getTranches());
      dispatch(resetSuccessTranche());
    }
    if (errorUpdate) {
      notify.show(errorUpdate, "error", 3000);
      dispatch(resetSuccessTranche());
    }
    return () => {};
  }, [successUpdate, errorUpdate]);

  return (
    <div className="donnees-globales-container">
      <Notifications />
      <ListeMetiers />
      {tranches ? (
        <>
          <TsTranche tranches={tranches} />
          <ChargesSociales tranches={tranches} />
        </>
      ) : null}
    </div>
  );
}
