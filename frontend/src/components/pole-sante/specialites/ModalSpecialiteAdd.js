import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactModal from "react-modal";
import AddIcon from "@material-ui/icons/Add";
import { useDispatch, useSelector } from "react-redux";
import { addSpecialite } from "../../../2-actions/specialiteActions";
import { getMetiers } from "../../../2-actions/DonneeGlobaleActions";

export default function ModalSpecialiteAdd({ pole, metiers }) {
  const [honoraires, setHonoraires] = useState("");
  const specialite = [
    {
      label: "Nombre",
      name: "nombre",
      defaultValue: "",
    },
    {
      label: "Honoraires (€)",
      name: "honoraires",
      defaultValue: honoraires,
    },
    {
      label: "Surface dédiée (m²)",
      name: "surfPropreProf",
      defaultValue: "",
    },
    {
      label: "Personnel d'accueil / secrétariat (heure)",
      name: "numbSalariesETP",
      defaultValue: "",
    },
  ];

  const [add, setAddSpecialite] = useState(false);

  const specialiteAdd = useSelector((state) => state.specialiteAdd);
  const { success: successAdd } = specialiteAdd;

  const { register, handleSubmit, reset, errors } = useForm({});

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const specialite = {
      name: data.name,
      nombre: data.nombre,
      honoraires: data.honoraires,
      surfPropreProf: data.surfPropreProf,
      numbSalariesETP: data.numbSalariesETP,
    };
    dispatch(addSpecialite(pole._id, specialite));
  };

  const honorairesHandler = (name) => {
    const metierSelected = metiers.filter((metier) => metier.name === name);
    setHonoraires(metierSelected[0].honoraires);
  };

  useEffect(() => {
    if (successAdd) {
      setAddSpecialite(false);
    }
    return () => {};
  }, [successAdd]);

  return (
    <>
      <ReactModal
        isOpen={add}
        className="modal-specialite modal"
        ariaHideApp={false}
        overlayClassName="overlay-add-specialite overlay"
        onRequestClose={() => {
          setAddSpecialite(!add);
          setHonoraires("");
        }}
      >
        <form
          className="form specialite-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="div-form-group-container">
            <div className="form-group">
              <label>Spécialité</label>
              {metiers ? (
                <select
                  name="name"
                  ref={register()}
                  defaultValue={"null"}
                  onChange={(e) => honorairesHandler(e.target.value)}
                >
                  <option value={"null"}>Séléctionnez une spécialité</option>
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
              Ajouter
            </button>
          </div>
        </form>
      </ReactModal>
      <button
        onClick={() => setAddSpecialite(!add)}
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
