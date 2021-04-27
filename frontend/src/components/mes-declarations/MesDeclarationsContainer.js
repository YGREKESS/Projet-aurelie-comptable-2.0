import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSuccessDeclaration } from "../../2-actions/declarationActions";
import { getUserDeclarations } from "../../2-actions/userActions";
import TableMesDeclarations from "./TableMesDeclarations";
import Notifications, { notify } from "react-notify-toast";
import LoadingSpinner from "../LoadingSpinner";

export default function MesDeclarations() {
  const userDeclarations = useSelector((state) => state.userDeclarations);
  const { loading, declarations, error } = userDeclarations;

  const userLogin = useSelector((state) => state.userLogin);
  const { userLoginInfos } = userLogin;

  const declarationAdd = useSelector((state) => state.declarationAdd);
  const { success: successAdd, error: errorAdd } = declarationAdd;

  const declarationUpdated = useSelector((state) => state.declarationUpdated);
  const { success: successUpdate, error: errorUpdate } = declarationUpdated;

  const declarationDelete = useSelector((state) => state.declarationDelete);
  const { success: successDelete, error: errorDelete } = declarationDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!declarations) {
      dispatch(getUserDeclarations(userLoginInfos._id));
    }
    if (successUpdate) {
      notify.show(
        "Les modifications ont été enregistrées !",
        "success",
        3000,
        "#0E1717"
      );
      dispatch(resetSuccessDeclaration());
      dispatch(getUserDeclarations(userLoginInfos._id));
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
      dispatch(getUserDeclarations(userLoginInfos._id));
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
      dispatch(getUserDeclarations(userLoginInfos._id));
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
      <div className="user-mesdeclarations-page page">
        <div style={{ width: "100%" }}>
          <p style={{ width: "100%", marginBottom: "0" }}>
            Consultez l'ensemble de vos déclarations.
          </p>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          ""
        ) : (
          <TableMesDeclarations declarations={declarations} />
        )}
      </div>
    </>
  );
}
