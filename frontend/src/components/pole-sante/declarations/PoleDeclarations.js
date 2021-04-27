import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalPoleDeclarationAdd from "./ModalPoleDeclarationAdd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDeclarations,
  resetSuccessDeclaration,
} from "../../../2-actions/declarationActions";
import TablePoleDeclarations from "./TablePoleDeclarations";
import LoadingSpinner from "../../LoadingSpinner";
import Notifications, { notify } from "react-notify-toast";

export default function PoleDeclarations() {
  const { id } = useParams();

  const allDeclarationsGet = useSelector((state) => state.allDeclarationsGet);
  const { loading, declarations, error } = allDeclarationsGet;

  const declarationUpdated = useSelector((state) => state.declarationUpdated);
  const { success: successUpdate, error: errorUpdate } = declarationUpdated;

  const declarationAdd = useSelector((state) => state.declarationAdd);
  const { success: successAdd, error: errorAdd } = declarationAdd;

  const declarationDelete = useSelector((state) => state.declarationDelete);
  const { success: successDelete, error: errorDelete } = declarationDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!declarations) {
      dispatch(getAllDeclarations(id));
    }
    if (successUpdate) {
      notify.show(
        "Les modifications ont été enregistrées !",
        "success",
        3000,
        "#0E1717"
      );
      dispatch(resetSuccessDeclaration());
      dispatch(getAllDeclarations(id));
    }
    if (errorUpdate) {
      notify.show(errorUpdate, "error", 3000, "#0E1717");
    }
    if (successAdd) {
      notify.show(
        "La déclaration a été enregistrée !",
        "success",
        3000,
        "#0E1717"
      );
      dispatch(resetSuccessDeclaration());
      dispatch(getAllDeclarations(id));
    }
    if (errorAdd) {
      notify.show(errorAdd, "error", 3000, "#0E1717");
    }
    if (successDelete) {
      notify.show(
        "La déclaration a été supprimée !",
        "danger",
        3000,
        "#0E1717"
      );
      dispatch(resetSuccessDeclaration());
      dispatch(getAllDeclarations(id));
    }
    if (errorDelete) {
      notify.show(errorDelete, "error", 3000, "#0E1717");
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
          Liste des déclarations du pôle.
        </p>
        <div style={{ width: "100%" }}>
          <div style={{ padding: "10px 10px" }}>
            <ModalPoleDeclarationAdd poleId={id} />
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        ""
      ) : (
        <TablePoleDeclarations poleId={id} declarations={declarations} />
      )}
    </>
  );
}
