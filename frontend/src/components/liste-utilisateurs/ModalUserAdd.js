import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import AddIcon from "@material-ui/icons/Add";
import FormUserInfos from "../mon-compte/FormUserInfos";
import { useSelector } from "react-redux";

export default function ModalUserAdd({ token, poles, metiers }) {
  const userCreate = useSelector((state) => state.userCreate);
  const { loading, success, error } = userCreate;

  const [addUser, setAddUser] = useState(false);

  useEffect(() => {
    if (success) {
      setAddUser(false);
    }
    return () => {};
  }, [success]);

  return (
    <>
      <ReactModal
        isOpen={addUser}
        className="modal-update-user modal"
        ariaHideApp={false}
        overlayClassName="overlay-update-user overlay"
        onRequestClose={() => setAddUser(!addUser)}
      >
        <FormUserInfos
          token={token}
          disabled={false}
          poles={poles}
          metiers={metiers}
          create={true}
        />
      </ReactModal>
      <button
        onClick={() => setAddUser(!addUser)}
        style={{
          marginLeft: "",
          margin: ".5rem 0 0 auto",
          background: "#379CE5",
        }}
      >
        <AddIcon style={{ fontSize: "1.5rem", margin: "auto" }} />
      </button>
    </>
  );
}
