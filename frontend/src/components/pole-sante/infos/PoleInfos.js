import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getOnePole,
  resetSuccessPole,
  updatePole,
} from "../../../2-actions/poleActions";
import { useDispatch, useSelector } from "react-redux";

export default function PoleInfos({ pole }) {
  const infos = [
    {
      infos: [
        {
          type: "input",
          label: "Nom",
          name: "name",
          defaultValue: pole.name,
        },
        {
          type: "input",
          label: "Adresse",
          name: "address",
          defaultValue: pole.address,
        },
        {
          type: "input",
          label: "Code postal",
          name: "postalCode",
          defaultValue: pole.postalCode,
        },
        {
          type: "input",
          label: "Ville",
          name: "city",
          defaultValue: pole.city,
        },
      ],
      surfaces: [
        {
          type: "input",
          label: "Loyer annuel (€)",
          name: "loyerAnnuel",
          defaultValue: pole.loyerAnnuel,
        },
        {
          type: "input",
          label: "Surface totale (m²)",
          name: "surfaceTotale",
          defaultValue: pole.surfaceTotale,
        },
        {
          type: "input",
          label: "Surface communs (m²)",
          name: "surfaceCommuns",
          defaultValue: pole.surfaceCommuns,
        },
      ],
    },
  ];
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const poleUpdated = useSelector((state) => state.poleUpdated);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = poleUpdated;

  const onSubmit = (data) => {
    const poleUpdated = {
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
    dispatch(updatePole(pole._id, poleUpdated));
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch(getOnePole(pole._id));
      dispatch(resetSuccessPole());
    }
    return () => {};
  }, [successUpdate]);

  return (
    <form className="form pole-infos-form" onSubmit={handleSubmit(onSubmit)}>
      <div style={{ width: "100%", marginBottom: "1rem" }}>
        <p style={{ width: "100%", marginBottom: "0" }}>
          Informations générales du pôle santé.
        </p>
      </div>
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
        <button>Mettre à jour</button>
      </div>
    </form>
  );
}
