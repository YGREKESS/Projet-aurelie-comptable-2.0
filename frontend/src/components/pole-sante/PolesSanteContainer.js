import React, { useEffect } from "react";
import TablePolesSante from "./TablePolesSante";
import { useDispatch, useSelector } from "react-redux";
import { getAllPole, resetSuccessPole } from "../../2-actions/poleActions";
import LoadingSpinner from "../LoadingSpinner";
import Notifications, { notify } from "react-notify-toast";

export default function PolesSante() {
  const allPolesGet = useSelector((state) => state.allPolesGet);
  const { loading, poles, error } = allPolesGet;

  const poleAdd = useSelector((state) => state.poleAdd);
  const { loading: loadingAdd, success: successAdd, error: errorAdd } = poleAdd;

  const poleDelete = useSelector((state) => state.poleDelete);
  const { success: successDelete, error: errorDelete } = poleDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPole());
    if (successDelete) {
      notify.show("Le pôle a été supprimé !", "danger", 5000, "#0E1717");
      dispatch(resetSuccessPole());
    }
    if (successAdd) {
      notify.show("Le pôle a été enregistré !", "success", 5000, "#0E1717");
      dispatch(resetSuccessPole());
    }
    if (errorDelete) {
      notify.show(errorDelete, "error", 5000, "#0E1717");
    }
    return () => {};
  }, [error, successAdd, successDelete]);

  return (
    <div
      className="table-poles-sante"
      style={{
        height: "100%",
      }}
    >
      <Notifications />
      <div style={{ width: "100%", marginBottom: "1rem" }}>
        <p style={{ width: "100%", marginBottom: "0" }}>
          Liste de l'ensemble des pôles santé.
        </p>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Error</div>
      ) : (
        <TablePolesSante poles={poles} />
      )}
    </div>
  );
}
