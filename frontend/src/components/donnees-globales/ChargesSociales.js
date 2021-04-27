import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getTranches,
  updateTranche,
  resetSuccessTranche,
} from "../../2-actions/DonneeGlobaleActions";

export default function ChargesSociales({ tranches }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const donneesUpdate = {
      tranche1: {
        tranche1percent: tranches.tranche1.tranche1percent,
        tranche1point: tranches.tranche1.tranche1point,
      },
      tranche2: {
        tranche2percent: tranches.tranche2.tranche2percent,
        tranche2point: tranches.tranche2.tranche2point,
      },
      tranche3: {
        tranche3percent: tranches.tranche3.tranche3percent,
        tranche3point: tranches.tranche3.tranche3point,
      },
      chargesSociales: Number(data.chargesSociales.split("%")[0]),
    };
    dispatch(updateTranche(donneesUpdate));
  };

  return (
    <form
      id="ts-charges-form"
      className="ts-tranche-form form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="div-form-group-container">
        <h2>Charges sociales</h2>
        <div className="form-group">
          <div className="tranche-container">
            {tranches ? (
              <input
                name={"chargesSociales"}
                placeholder=""
                ref={register()}
                defaultValue={tranches.chargesSociales + "%"}
              />
            ) : null}
          </div>
        </div>
      </div>
      <button className="button" form="ts-charges-form">
        Valider
      </button>
    </form>
  );
}
