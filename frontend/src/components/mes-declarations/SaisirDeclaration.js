import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserDeclarationForm from "./UserDeclarationForm";
import Notifications, { notify } from "react-notify-toast";
import { resetSuccessDeclaration } from "../../2-actions/declarationActions";
import { getInfos, getUserDeclarations } from "../../2-actions/userActions";

export default function SaisirDeclaration(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userLoginInfos } = userLogin;

  const userInfos = useSelector((state) => state.userInfos);
  const { loading, user, error } = userInfos;

  const declarationAdd = useSelector((state) => state.declarationAdd);
  const { success: successAdd, error: errorAdd } = declarationAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getInfos(userLoginInfos._id, userLoginInfos.token));
    }
    if (successAdd) {
      props.history.push("/mon-espace/mes-declarations/historique");
    }
    if (errorAdd) {
      notify.show(errorAdd, "error", 5000, "#0E1717");
    }
    return () => {};
  }, [successAdd, errorAdd]);
  return (
    <>
      <Notifications />
      <UserDeclarationForm user={user} />
    </>
  );
}
