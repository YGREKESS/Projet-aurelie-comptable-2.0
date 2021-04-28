import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { deleteDeclaration } from "../../../2-actions/declarationActions";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ModalDeclarationDelete({ item }) {
  const [deleteDecla, setDeleteDecla] = useState(false);

  const declarationDelete = useSelector((state) => state.declarationDelete);
  const { success: successDelete, error: errorDelete } = declarationDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      setDeleteDecla(false);
    }
    return () => {};
  }, [successDelete]);

  return (
    <>
      <ReactModal
        isOpen={deleteDecla}
        className="modal-delete-declaration modal"
        ariaHideApp={false}
        overlayClassName="overlay-delete-declaration overlay"
        onRequestClose={() => setDeleteDecla(!deleteDecla)}
      >
        <div className="modal-delete-body">
          <p>
            Vous êtes sur le point de supprimer :<br />
            <span>"{item.title}"</span>
          </p>
          <div className={"buttons-container"}>
            <button
              className="button"
              style={{ background: "red" }}
              onClick={() => dispatch(deleteDeclaration(item._id))}
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
              onClick={() => setDeleteDecla(!deleteDecla)}
            >
              Annuler
            </button>
          </div>
        </div>
      </ReactModal>
      <button
        onClick={() => setDeleteDecla(!deleteDecla)}
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
