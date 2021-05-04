import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../2-actions/dataActions";
import { getAllPole } from "../../2-actions/poleActions";
import TableListeUtilisateurs from "./TableListeUtilisateurs";
import Notifications, { notify } from "react-notify-toast";
import { userSuccessReset } from "../../2-actions/userActions";
import { getMetiers } from "../../2-actions/DonneeGlobaleActions";
import LoadingSpinner from "../LoadingSpinner";
import ModalUserAdd from "./ModalUserAdd";
import { getAllDeclarations } from "../../2-actions/declarationActions";

export default function ListeUtilisateurs() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userLoginInfos } = userLogin;

  const getAllUsersRed = useSelector((state) => state.getAllUsers);
  const { loading, users, error } = getAllUsersRed;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = userDelete;

  const userCreate = useSelector((state) => state.userCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = userCreate;

  const userSendEmail = useSelector((state) => state.userSendEmail);
  const {
    loading: loadingSend,
    success: successSend,
    error: errorSend,
  } = userSendEmail;

  const allPolesGet = useSelector((state) => state.allPolesGet);
  const { loading: loadingPole, poles, error: errorPole } = allPolesGet;

  const metiersGet = useSelector((state) => state.metiersGet);
  const { loading: loadingGet, metiers, error: errorGet } = metiersGet;

  useEffect(() => {
    if (!users) {
      dispatch(getAllUsers(userLoginInfos.token));
    }
    if (!poles) {
      dispatch(getAllPole());
    }
    if (!metiers) {
      dispatch(getMetiers());
    }
    if (successCreate) {
      notify.show("L'utilisateur a été créé !", "success", 3000);
      dispatch(getAllUsers(userLoginInfos.token));
      dispatch(userSuccessReset());
    }
    if (errorCreate) {
      notify.show(errorCreate, "error", 3000);
      dispatch(userSuccessReset());
    }
    if (successDelete) {
      notify.show("L'utilisateur a été supprimé !", "danger", 3000);
      dispatch(getAllUsers(userLoginInfos.token));
      dispatch(getAllDeclarations());
      dispatch(userSuccessReset());
    }
    if (errorDelete) {
      notify.show(errorDelete, "error", 3000);
      dispatch(userSuccessReset());
    }
    if (successSend) {
      notify.show("L'email a été envoyé !", "success", 3000);
      dispatch(userSuccessReset());
    }
    if (errorSend) {
      notify.show(errorSend, "error", 3000);
      dispatch(userSuccessReset());
    }
    return () => {};
  }, [
    successDelete,
    errorDelete,
    successCreate,
    errorCreate,
    errorSend,
    successSend,
  ]);

  return (
    <div className="table-liste-utilisateurs">
      <Notifications />
      <div style={{ width: "100%", marginBottom: "1rem" }}>
        <p style={{ width: "100%", marginBottom: "0" }}>
          Liste de l'ensemble des utilisateurs.
        </p>
        <div style={{ width: "100%" }}>
          <div style={{ padding: "10px 10px" }}>
            {poles && metiers ? (
              <ModalUserAdd
                token={userLoginInfos.token}
                poles={poles}
                metiers={metiers}
              />
            ) : null}
          </div>
        </div>
      </div>
      {users ? (
        <TableListeUtilisateurs users={users} poles={poles} metiers={metiers} />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
