import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addPole, getAllPole } from "../../2-actions/poleActions";
import Notifications, { notify } from "react-notify-toast";

export default function AddPoleSante(props) {
  const infos = [
    {
      infos: [
        {
          type: "input",
          label: "Nom",
          name: "name",
          defaultValue: "",
        },
        {
          type: "input",
          label: "Adresse",
          name: "address",
          defaultValue: "",
        },
        {
          type: "input",
          label: "Code postal",
          name: "postalCode",
          defaultValue: "",
        },
        {
          type: "input",
          label: "Ville",
          name: "city",
          defaultValue: "",
        },
      ],
      surfaces: [
        {
          type: "input",
          label: "Loyer annuel (€)",
          name: "loyerAnnuel",
          defaultValue: "",
        },
        {
          type: "input",
          label: "Surface totale (m²)",
          name: "surfaceTotale",
          defaultValue: "",
        },
        {
          type: "input",
          label: "Surface communs (m²)",
          name: "surfaceCommuns",
          defaultValue: "",
        },
      ],
    },
  ];
  const { register, handleSubmit, errors } = useForm();

  const poleAdd = useSelector((state) => state.poleAdd);
  const { loading, success, error } = poleAdd;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const pole = {
      name: data.name,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      surfaceTotale: data.surfaceTotale,
      surfaceCommuns: data.surfaceCommuns,
      loyerAnnuel: data.loyerAnnuel,
      loyerMensuelm2: (
        Number(data.loyerAnnuel / data.surfaceTotale) / 12
      ).toFixed(2),
    };
    dispatch(addPole(pole));
  };

  useEffect(() => {
    if (success) {
      dispatch(getAllPole());
      props.history.push("/mon-espace/admin/poles-sante/");
    }
    if (error) {
      notify.show(error, "error", 5000, "#0E1717");
    }
    return () => {};
  }, [success, error]);
  return (
    <>
      <Notifications />
      <form className="form pole-infos-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="part adresse">
          <div className="div-form-group-title title">
            <div className="form-group">
              <h2>Infos générales</h2>
            </div>
          </div>
          {infos[0].infos.map((info, i) => (
            <div className="div-form-group-container" key={i}>
              <div className="form-group">
                <label>{info.label}</label>
                <input
                  name={info.name}
                  defaultValue={info.defaultValue}
                  ref={register}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="part locaux">
          <div className="div-form-group-title title">
            <div className="form-group">
              <h2>Locaux</h2>
            </div>
          </div>
          {infos[0].surfaces.map((surface, i) =>
            surface.type === "input" ? (
              <div className="div-form-group-container" key={i}>
                <div key={i} className="form-group">
                  <label>{surface.label}</label>
                  <input
                    name={surface.name}
                    defaultValue={surface.defaultValue}
                    ref={register}
                  />
                </div>
              </div>
            ) : (
              <div className="div-form-group-container select" key={i}>
                <div className="form-group">
                  <label htmlFor={surface.name}>{surface.label}</label>
                  <select
                    name={surface.name}
                    ref={register}
                    defaultValue={surface.defaultValue}
                  >
                    {surface.options.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )
          )}
        </div>
        <div className="form-validate">
          <button>Ajouter</button>
        </div>
      </form>
    </>
  );
}
