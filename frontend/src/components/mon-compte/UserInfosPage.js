import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormUserInfos from "./FormUserInfos";
import { getAllPole } from "../../2-actions/poleActions";
import { getMetiers } from "../../2-actions/DonneeGlobaleActions";

export default function UserInfosPage() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userLoginInfos } = userLogin;

  const userInfos = useSelector((state) => state.userInfos);
  const { loading: loadingUser, user, error: errorUser } = userInfos;

  const allPolesGet = useSelector((state) => state.allPolesGet);
  const { loading: loadingPole, poles, error: errorPole } = allPolesGet;

  const metiersGet = useSelector((state) => state.metiersGet);
  const { loading: loadingGet, metiers, error: errorGet } = metiersGet;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!poles) {
      dispatch(getAllPole());
    }
    if (!metiers) {
      dispatch(getMetiers());
    }
    return () => {};
  }, []);

  return (
    <div className="user-infos-page page">
      <div style={{ width: "100%", marginBottom: "4rem" }}>
        <p style={{ width: "100%", marginBottom: "0" }}>
          Consultez ou modifiez vos informations personnelles.
        </p>
      </div>
      <FormUserInfos
        user={user}
        token={userLoginInfos.token}
        poles={poles}
        disabled={true}
        metiers={metiers}
      />
    </div>
  );
}
