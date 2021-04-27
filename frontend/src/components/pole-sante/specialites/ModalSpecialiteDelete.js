import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { deleteDeclaration } from "../../../2-actions/declarationActions";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteSpecialite } from "../../../2-actions/specialiteActions";

export default function ModalSpecialiteDelete({ item }) {
  const [deleteSpe, setDeleteSpe] = useState(false);

  const specialiteDelete = useSelector((state) => state.specialiteDelete);
  const { success: successDelete, error: errorDelete } = specialiteDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      setDeleteSpe(false);
    }
    return () => {};
  }, [successDelete]);

  return (
    <>
      <ReactModal
        isOpen={deleteSpe}
        className="modal-delete-declaration modal"
        ariaHideApp={false}
        overlayClassName="overlay-delete-declaration overlay"
        onRequestClose={() => setDeleteSpe(!deleteSpe)}
      >
        <div className="modal-delete-body">
          <p>
            Vous êtes sur le point de supprimer :<br />
            <span>"{item.name}"</span>
          </p>
          <div className={"buttons-container"}>
            <button
              className="button"
              style={{ background: "red" }}
              onClick={() => dispatch(deleteSpecialite(item._id))}
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
              onClick={() => setDeleteSpe(!deleteSpe)}
            >
              Annuler
            </button>
          </div>
        </div>
      </ReactModal>
      <button
        onClick={() => setDeleteSpe(!deleteSpe)}
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
