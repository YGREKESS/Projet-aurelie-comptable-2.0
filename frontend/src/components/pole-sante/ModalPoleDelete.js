import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { deletePole } from "../../2-actions/poleActions";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ModalPoleDelete({ item }) {
  const [deletePoleState, setDeletePole] = useState(false);

  const poleDelete = useSelector((state) => state.poleDelete);
  const { success: successDelete, error: errorDelete } = poleDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      setDeletePole(false);
    }
    return () => {};
  }, [successDelete]);

  return (
    <>
      <ReactModal
        isOpen={deletePoleState}
        className="modal-delete-declaration modal"
        ariaHideApp={false}
        overlayClassName="overlay-delete-declaration overlay"
        onRequestClose={() => setDeletePole(!deletePoleState)}
      >
        <div className="modal-delete-body">
          <p>
            Vous êtes sur le point de supprimer :<br />
            <span>{item.name}</span>
          </p>
          <div className={"buttons-container"}>
            <button
              className="button"
              style={{ background: "red" }}
              onClick={() => dispatch(deletePole(item._id))}
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
              onClick={() => setDeletePole(!deletePoleState)}
            >
              Annuler
            </button>
          </div>
        </div>
      </ReactModal>
      <button
        onClick={() => setDeletePole(!deletePoleState)}
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
