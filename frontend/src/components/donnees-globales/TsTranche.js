import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getTranches,
  resetSuccessTranche,
  updateTranche,
} from "../../2-actions/DonneeGlobaleActions";

export default function TsTranche({ tranches }) {
  const [arrayTranches, setArrayTranches] = useState(null);
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const donneesUpdate = {
      tranche1: {
        tranche1percent: Number(data.tranche1percent.split("%")[0]),
        tranche1point: Number(data.tranche1point),
      },
      tranche2: {
        tranche2percent: Number(data.tranche2percent.split("%")[0]),
        tranche2point: Number(data.tranche2point),
      },
      tranche3: {
        tranche3percent: Number(data.tranche3percent.split("%")[0]),
        tranche3point: Number(data.tranche3point),
      },
      chargesSociales: 20,
    };
    dispatch(updateTranche(donneesUpdate));
  };

  useEffect(() => {
    if (tranches) {
      setArrayTranches([
        Object.entries(tranches)[0],
        Object.entries(tranches)[1],
        Object.entries(tranches)[2],
      ]);
    }

    return () => {};
  }, [tranches]);

  return (
    <form
      id="ts-tranche-form"
      className="ts-tranche-form form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {arrayTranches
        ? arrayTranches.map((tranche, i) => (
            <div className="div-form-group-container" key={i}>
              <h2>{"Tranche " + (i + 1)}</h2>
              <div className="form-group">
                <div className="tranche-container">
                  <input
                    name={"tranche" + (i + 1) + "percent"}
                    placeholder=""
                    ref={register()}
                    defaultValue={
                      tranche[1]["tranche" + (i + 1) + "percent"] + "%"
                    }
                  />
                  <input
                    name={"tranche" + (i + 1) + "point"}
                    placeholder=""
                    ref={register()}
                    defaultValue={tranche[1]["tranche" + (i + 1) + "point"]}
                  />
                </div>
              </div>
            </div>
          ))
        : null}
      <button className="button" form="ts-tranche-form">
        Valider
      </button>
    </form>
  );
}
