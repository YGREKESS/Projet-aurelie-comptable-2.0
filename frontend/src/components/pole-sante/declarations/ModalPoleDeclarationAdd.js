import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import AddIcon from "@material-ui/icons/Add";
import { addDeclaration } from "../../../2-actions/declarationActions";
import { useDispatch, useSelector } from "react-redux";
import "../../../1-css/Table.css";
import DeleteIcon from "@material-ui/icons/Delete";
import uniqid from "uniqid";

export default function ModalPoleDeclarationAdd({ poleId }) {
  const [add, setAddDeclaration] = useState(false);
  const arrayMap = ["1", "1", "1", "1", "1"];
  const declarationAdd = useSelector((state) => state.declarationAdd);
  const { success: successAdd } = declarationAdd;

  const { register, handleSubmit, reset, errors } = useForm({});

  const dispatch = useDispatch();

  const addRowHandler = () => {
    const rows = document.querySelectorAll(".declaration-row");
    const tBody = document.querySelectorAll(".declaration-body")[0];

    let newRow = rows[0].cloneNode(true);

    newRow.childNodes.forEach((child, i) => {
      if (i < 2) {
        child.firstChild.value = "";
      }
      if (i === 2) {
        child.firstChild.value = "coefSurface";
      }
    });

    newRow.lastChild.firstChild.onclick = () => deleteRowHandler(newRow);
    tBody.appendChild(newRow);
  };

  const deleteRowHandler = (target) => {
    const rows = document.querySelectorAll(".declaration-row");
    if (rows.length > 1) {
      target.remove();
    }
  };

  const onSubmit = (data) => {
    let chargesArray = [];
    const rows = document.querySelectorAll(".declaration-row");
    const name = document.querySelectorAll(".declaration-input-name");
    const total = document.querySelectorAll(".declaration-input-total");
    const repartition = document.querySelectorAll(
      ".declaration-select-repartition"
    );

    for (let i = 0; i < rows.length; i++) {
      if (
        name[i].value !== "" &&
        total[i].value !== "" &&
        repartition[i].value !== ""
      ) {
        let charge = {
          name: name[i].value,
          total: total[i].value,
          repartition: repartition[i].value,
        };
        chargesArray.push(charge);
      }
    }
    const declaration = {
      pole: poleId,
      title: data.title,
      type: "Pole",
      charges: chargesArray,
    };

    dispatch(addDeclaration(declaration));
  };

  useEffect(() => {
    if (successAdd) {
      setAddDeclaration(false);
    }
    return () => {};
  }, [successAdd]);

  return (
    <>
      <ReactModal
        isOpen={add}
        className="modal-update-declaration modal"
        ariaHideApp={false}
        overlayClassName="overlay-update-declaration overlay"
        onRequestClose={() => setAddDeclaration(!add)}
      >
        <button
          onClick={() => addRowHandler()}
          type={"button"}
          style={{
            background: "green",
            margin: "1rem 1rem 1rem auto",
          }}
        >
          <AddIcon />
        </button>
        <form
          className="form pole-declaration-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <table className="declaration-table table">
            <thead className="declaration-head">
              <tr>
                <th>Charge</th>
                <th>Total</th>
                <th>Répartition</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="declaration-body body">
              {arrayMap.map((element, i) => (
                <tr key={i} className="declaration-row row">
                  <td>
                    <input
                      className="declaration-input-name input"
                      name="name"
                      ref={register()}
                    />
                  </td>
                  <td>
                    <input
                      className="declaration-input-total input"
                      name="total"
                      ref={register()}
                    />
                  </td>
                  <td>
                    <select
                      className="declaration-select-repartition select"
                      name="repartition"
                      ref={register()}
                    >
                      <option value={"coefSurface"}>Coef surface</option>
                      <option value={"partsEgales"}>Parts égales</option>
                      <option value={"ponderation"}>Pondération</option>
                      <option value={"recettes"}>Recettes</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={(e) =>
                        deleteRowHandler(
                          e.currentTarget.parentElement.parentElement
                        )
                      }
                      type={"button"}
                      style={{
                        background: "red",
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="declaration-title form-group">
            <label>Souhaitez-vous donner un titre à votre déclaration ?</label>
            <input
              className="declaration-input-title input"
              name="title"
              ref={register()}
            />
          </div>
          <div className="form-validate">
            <button type="submit" value="">
              Valider
            </button>
          </div>
        </form>
      </ReactModal>
      <button
        onClick={() => setAddDeclaration(!add)}
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
