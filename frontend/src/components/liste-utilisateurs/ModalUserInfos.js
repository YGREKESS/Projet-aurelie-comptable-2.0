import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import SearchIcon from "@material-ui/icons/Search";
import FormUserInfos from "../mon-compte/FormUserInfos";
import { useDispatch, useSelector } from "react-redux";

export default function ModalUserInfos({ user, poles, metiers }) {
  const [userInfos, setUserInfos] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userLoginInfos } = userLogin;

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <ReactModal
        isOpen={userInfos}
        className="modal-update-user modal"
        ariaHideApp={false}
        overlayClassName="overlay-update-user overlay"
        onRequestClose={() => setUserInfos(!userInfos)}
      >
        <>
          <div style={{ width: "100%", marginBottom: "4rem" }}>
            <p
              style={{ width: "100%", marginBottom: "0", textAlign: "center" }}
            >
              Consultez ou modifiez les informations de l'utilisateur.
            </p>
          </div>
          <FormUserInfos
            user={user}
            poles={poles}
            token={userLoginInfos.token}
            disabled={false}
            metiers={metiers}
            email={true}
          />
        </>
      </ReactModal>
      <button
        style={{
          marginLeft: "",
          margin: ".5rem 0 0 auto",
          background: "#379CE5",
        }}
        onClick={() => setUserInfos(!userInfos)}
      >
        <SearchIcon />
      </button>
    </>
  );
}
