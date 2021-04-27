import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";
import { updateDeclaration } from "../../../2-actions/declarationActions";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import "../../../1-css/Table.css";

export default function ModalPoleDeclarationUpdate({ item }) {
  const [update, setUpdateDeclaration] = useState(false);
  const arrayMap = ["1", "1", "1", "1", "1"];

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

    const declarationUpdated = {
      pole: item.pole,
      title: data.title,
      charges: chargesArray,
    };

    console.log(declarationUpdated);
    dispatch(updateDeclaration(item._id, declarationUpdated));
  };

  useEffect(() => {
    console.log(item);
    return () => {};
  }, []);
  return (
    <>
      <ReactModal
        isOpen={update}
        className="modal-update-declaration modal"
        ariaHideApp={false}
        overlayClassName="overlay-update-declaration overlay"
        onRequestClose={() => setUpdateDeclaration(!update)}
      >
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
              {item.charges.map((charge, i) => (
                <tr key={i} className="declaration-row row">
                  <td>
                    <input
                      className="declaration-input-name input"
                      name="name"
                      defaultValue={charge.name}
                      ref={register()}
                    />
                  </td>
                  <td>
                    <input
                      className="declaration-input-total input"
                      name="total"
                      defaultValue={charge.total}
                      ref={register()}
                    />
                  </td>
                  <td>
                    <select
                      className="declaration-select-repartition select"
                      name="repartition"
                      defaultValue={charge.repartition}
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
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button
                    onClick={() => addRowHandler()}
                    type={"button"}
                    style={{
                      background: "green",
                    }}
                  >
                    <AddIcon />
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="declaration-title form-group">
            <label>Titre de votre déclaration</label>
            <input
              className="declaration-input-title input"
              name="title"
              defaultValue={item.title}
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
        className="button"
        onClick={() => setUpdateDeclaration(!update)}
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
