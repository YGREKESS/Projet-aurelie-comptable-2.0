import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMetiers,
  addMetier,
  deleteMetier,
  resetSuccessMetier,
} from "../../2-actions/DonneeGlobaleActions";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Notifications, { notify } from "react-notify-toast";
import { useForm } from "react-hook-form";

export default function ListeMetiers() {
  const { register, handleSubmit, reset, errors } = useForm();

  const dispatch = useDispatch();

  const metiersGet = useSelector((state) => state.metiersGet);
  const { loading: loadingGet, metiers, error: errorGet } = metiersGet;

  const metierAdd = useSelector((state) => state.metierAdd);
  const {
    loading: loadingAdd,
    success: successAdd,
    error: errorAdd,
  } = metierAdd;

  const metierDelete = useSelector((state) => state.metierDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = metierDelete;

  const onSubmit = (data) => {
    const metier = {
      name: data.name,
      honoraires: data.honoraires,
    };
    dispatch(addMetier(metier));
    reset({});
  };

  useEffect(() => {
    if (!metiers) {
      dispatch(getMetiers());
    }
    if (successDelete || successAdd) {
      dispatch(getMetiers());
      dispatch(resetSuccessMetier());
    }
    if (errorDelete || errorAdd) {
      dispatch(resetSuccessMetier());
    }
    return () => {};
  }, [successDelete, successAdd, errorDelete, errorAdd]);

  return (
    <div className="liste-metier-component">
      <h2>Liste des spécialités</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="div-form-group-container">
          <div className="form-group">
            <label>Nom</label>
            <input name="name" ref={register()} />
          </div>
          <div className="form-group">
            <label>Honoraires</label>
            <input name="honoraires" ref={register()} />
          </div>
        </div>

        <button
          style={{
            background: "#379CE5",
          }}
        >
          <AddIcon style={{ fontSize: "1.5rem", margin: "auto" }} />
        </button>
      </form>
      <ul>
        {metiers
          ? metiers.map((metier, i) => (
              <li key={i}>
                <div className="div-form-group-container">
                  <div className="form-group">
                    <input value={metier.name} readOnly />
                  </div>
                  <div className="form-group">
                    <input value={metier.honoraires + " €"} readOnly />
                  </div>
                </div>
                <button
                  onClick={() => dispatch(deleteMetier(metier._id))}
                  style={{
                    background: "red",
                  }}
                >
                  <DeleteIcon />
                </button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
