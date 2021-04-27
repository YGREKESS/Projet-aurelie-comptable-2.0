import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import { updateSpecialite } from "../../../2-actions/specialiteActions";
import { useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";

export default function ModalSpecialiteUpdate({ item, metiers }) {
  const specialite = [
    {
      label: "Nombre",
      name: "nombre",
      defaultValue: item.nombre,
    },
    {
      label: "Honoraires (€)",
      name: "honoraires",
      defaultValue: item.honoraires,
    },
    {
      label: "Surface dédiée (m²)",
      name: "surfPropreProf",
      defaultValue: item.surfPropreProf,
    },
    {
      label: "Personnel d'accueil / secrétariat (heure)",
      name: "numbSalariesETP",
      defaultValue: item.numbSalariesETP,
    },
  ];

  const [update, setUpdateSpecialite] = useState(false);
  const { register, handleSubmit, reset, errors } = useForm({});

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const specialiteUpdated = {
      pole: item.pole,
      name: data.name,
      nombre: data.nombre,
      honoraires: data.honoraires,
      surfPropreProf: data.surfPropreProf,
      numbSalariesETP: data.numbSalariesETP,
    };
    dispatch(updateSpecialite(item._id, specialiteUpdated));
  };

  return (
    <>
      <ReactModal
        isOpen={update}
        className="modal-specialite modal"
        ariaHideApp={false}
        overlayClassName="overlay-update-specialite overlay"
        onRequestClose={() => setUpdateSpecialite(!update)}
      >
        <form
          className="form specialite-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="div-form-group-container">
            <div className="form-group">
              <label>Spécialité</label>
              {metiers ? (
                <select name="name" ref={register()} defaultValue={item.name}>
                  {metiers.map((metier, i) => (
                    <option value={metier.name} key={i}>
                      {metier.name}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          </div>
          {specialite.map((template, i) => (
            <div className="div-form-group-container" key={i}>
              <div className="form-group">
                <label>{template.label}</label>
                <input
                  name={template.name}
                  defaultValue={template.defaultValue}
                  ref={register}
                />
              </div>
            </div>
          ))}
          <div className="form-validate">
            <button type="submit" value="">
              Modifier
            </button>
          </div>
        </form>
      </ReactModal>
      <button
        onClick={() => setUpdateSpecialite(!update)}
        style={{
          marginLeft: "",
          margin: ".5rem 0 0 auto",
          background: "#379CE5",
        }}
      >
        <SearchIcon />
      </button>
    </>
  );
}
