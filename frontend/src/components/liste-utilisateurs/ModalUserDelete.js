import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteUser } from "../../2-actions/userActions";

export default function ModalUserDelete({ item }) {
  const [deleteUserState, setDeleteUser] = useState(false);

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: errorDelete } = userDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userLoginInfos } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      setDeleteUser(false);
    }
    return () => {};
  }, [successDelete]);

  return (
    <>
      <ReactModal
        isOpen={deleteUserState}
        className="modal-delete-declaration modal"
        ariaHideApp={false}
        overlayClassName="overlay-delete-declaration overlay"
        onRequestClose={() => setDeleteUser(!deleteUserState)}
      >
        <div className="modal-delete-body">
          <p>
            Vous êtes sur le point de supprimer :<br />
            <span>{item.lastname + " " + item.firstname}</span>
          </p>
          <div className={"buttons-container"}>
            <button
              className="button"
              style={{ background: "red" }}
              onClick={() =>
                dispatch(deleteUser(item._id, userLoginInfos.token))
              }
            >
              Supprimer
            </button>
            <button
              className="button"
              style={{
                background: "white",
                color: "black",
                border: "1px solid black",
              }}
              onClick={() => setDeleteUser(!deleteUserState)}
            >
              Annuler
            </button>
          </div>
        </div>
      </ReactModal>
      <button
        onClick={() => setDeleteUser(!deleteUserState)}
        style={{
          marginLeft: "",
          margin: ".5rem 0 0 2rem",
          background: "red",
        }}
      >
        <DeleteIcon />
      </button>
    </>
  );
}
