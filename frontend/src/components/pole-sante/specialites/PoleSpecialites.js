import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllSpecialites,
  resetSuccessSpecialite,
} from "../../../2-actions/specialiteActions";
import TablePoleSpecialites from "./TablePoleSpecialites";
import ModalSpecialiteAdd from "./ModalSpecialiteAdd";
import LoadingSpinner from "../../LoadingSpinner";
import Notifications, { notify } from "react-notify-toast";
import { getMetiers } from "../../../2-actions/DonneeGlobaleActions";

export default function PoleSpecialites() {
  const { id } = useParams();

  const poleSelected = useSelector((state) => state.poleSelected);
  const { pole } = poleSelected;

  const allSpecialitesGet = useSelector((state) => state.allSpecialitesGet);
  const { loading, specialites, error } = allSpecialitesGet;

  const specialiteUpdated = useSelector((state) => state.specialiteUpdated);
  const { success: successUpdate, error: errorUpdate } = specialiteUpdated;

  const specialiteAdd = useSelector((state) => state.specialiteAdd);
  const { success: successAdd, error: errorAdd } = specialiteAdd;

  const specialiteDelete = useSelector((state) => state.specialiteDelete);
  const { success: successDelete, error: errorDelete } = specialiteDelete;

  const metiersGet = useSelector((state) => state.metiersGet);
  const { loading: loadingGet, metiers, error: errorGet } = metiersGet;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpecialites(id));
    if (!metiers) {
      dispatch(getMetiers());
    }
    if (successUpdate) {
      notify.show(
        "Les modifications ont été enregistrées !",
        "success",
        3000,
        "#0E1717"
      );
      dispatch(resetSuccessSpecialite());
    }
    if (errorUpdate) {
      notify.show(errorUpdate, "error", 3000, "#0E1717");
      dispatch(resetSuccessSpecialite());
    }
    if (successAdd) {
      notify.show(
        "La spécialité a été enregistrée !",
        "success",
        3000,
        "#0E1717"
      );
      dispatch(resetSuccessSpecialite());
    }
    if (errorAdd) {
      notify.show(errorAdd, "error", 3000, "#0E1717");
      dispatch(resetSuccessSpecialite());
    }
    if (successDelete) {
      notify.show("La spécialité a été supprimée !", "danger", 3000, "#0E1717");
      dispatch(resetSuccessSpecialite());
      dispatch(getAllSpecialites(id));
    }
    if (errorDelete) {
      notify.show(errorDelete, "error", 3000, "#0E1717");
      dispatch(resetSuccessSpecialite());
    }
    return () => {};
  }, [
    successUpdate,
    errorUpdate,
    successAdd,
    errorAdd,
    successDelete,
    errorDelete,
  ]);

  return (
    <>
      <Notifications />
      <div style={{ width: "100%" }}>
        <p style={{ width: "100%", marginBottom: "0" }}>
          Liste des spécialités présentes au sein du pôle.
        </p>
        <div style={{ width: "100%" }}>
          <div style={{ padding: "10px 10px" }}>
            <ModalSpecialiteAdd pole={pole} metiers={metiers} />
          </div>
        </div>
      </div>
      {loading || loadingGet ? (
        <LoadingSpinner />
      ) : error ? (
        ""
      ) : (
        <TablePoleSpecialites
          metiers={metiers}
          pole={pole}
          specialites={specialites}
        />
      )}
    </>
  );
}
