import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDeclarations,
  getOneDeclaration,
  resetDeclarationSelected,
} from "../../../2-actions/declarationActions";
import { getAllSpecialites } from "../../../2-actions/specialiteActions";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { getTranches } from "../../../2-actions/DonneeGlobaleActions";
import Tables from "./Tables";
import AccordeonUserSelected from "./AccordeonUserSelected";
import { getPraticiens } from "../../../2-actions/poleActions";
import CloseIcon from "@material-ui/icons/Close";
import ChartAnalyse from "./ChartAnalyse";

export default function PoleAnalyse() {
  const { id } = useParams();

  const poleSelected = useSelector((state) => state.poleSelected);
  const { pole } = poleSelected;

  const tranchesGet = useSelector((state) => state.tranchesGet);
  const { tranches } = tranchesGet;

  const allSpecialitesGet = useSelector((state) => state.allSpecialitesGet);
  const {
    loading: loadingSpecialites,
    specialites,
    error: errorSpecialites,
  } = allSpecialitesGet;

  const polePraticiens = useSelector((state) => state.polePraticiens);
  const {
    loading: loadingPraticiens,
    praticiens,
    error: errorPraticiens,
  } = polePraticiens;

  const allDeclarationsGet = useSelector((state) => state.allDeclarationsGet);
  const {
    loading: loadingDeclarations,
    declarations,
    error: errorDeclarations,
  } = allDeclarationsGet;

  const declarationSelected = useSelector((state) => state.declarationSelected);
  const {
    loading: loadingDeclaration,
    declaration: declarationChoosed,
    error: errorDeclaration,
  } = declarationSelected;

  const [error, setError] = useState("");
  const [userToAnalyse, setUserToAnalyse] = useState({});
  const [userSelected, setUserSelected] = useState(null);
  const [salaireBrut, setSalaireBrut] = useState(1600);
  const [ponderation, setPonderation] = useState({
    partFixe: 2,
    coefSurface: 1,
    recettes: 1,
  });

  const { register, handleSubmit, reset, errors } = useForm({});

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (data.declaration !== "aucun") {
      dispatch(getOneDeclaration(data.declaration));
    } else {
      setError("Merci de sélectionner une déclaration.");
    }
  };

  useEffect(() => {
    if (!tranches) {
      dispatch(getTranches());
    }
    if (!praticiens) {
      dispatch(getPraticiens(id));
    }
    if (!specialites) {
      dispatch(getAllSpecialites(id));
    }
    if (!declarations) {
      dispatch(getAllDeclarations(id));
    }

    return () => {};
  }, [declarationChoosed]);

  return (
    <div className="pole-analyse-page page">
      <div style={{ width: "100%", marginBottom: "4rem" }}></div>
      <form
        id="declarationchoosed-form"
        className="form declarationchoosed-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group">
          <h2>Choix de la déclaration</h2>
          <select
            name="declaration"
            defaultValue={declarationChoosed ? declarationChoosed._id : "aucun"}
            onChange={() => setError("")}
            ref={register}
          >
            <option value={"aucun"}>Séléctionnez la déclaration</option>
            {declarations
              ? declarations.map((declaration, i) =>
                  declaration.type === "Pole" ? (
                    <option value={`${declaration._id}`} key={i}>
                      {declaration.title}
                    </option>
                  ) : null
                )
              : null}
          </select>
        </div>
        <div className="form-group ponderation">
          <h2>Pondération</h2>
          <div>
            <label>Part fixe répartie</label>
            <input
              onChange={(e) =>
                setPonderation({ ...ponderation, partFixe: e.target.value })
              }
              defaultValue={ponderation.partFixe}
            />
          </div>
          <div>
            <label>Coef surface</label>
            <input
              onChange={(e) =>
                setPonderation({ ...ponderation, coefSurface: e.target.value })
              }
              defaultValue={ponderation.coefSurface}
            />
          </div>
          <div>
            <label>%recettes</label>
            <input
              onChange={(e) =>
                setPonderation({ ...ponderation, recettes: e.target.value })
              }
              defaultValue={ponderation.recettes}
            />
          </div>
        </div>
        <div className="form-group ponderation">
          <h2>Salariés</h2>
          <div>
            <label>Salaire brut (€)</label>
            <input
              onChange={(e) => setSalaireBrut(e.target.value)}
              defaultValue={1600}
            />
          </div>
        </div>
        <div className="error-detail">
          {error ? <p className="danger">{error}</p> : ""}
        </div>
      </form>

      {praticiens && declarations ? (
        <AccordeonUserSelected
          key={userToAnalyse}
          userToAnalyse={userToAnalyse}
          setUserToAnalyse={setUserToAnalyse}
          praticiens={praticiens}
          declarations={declarations}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
        />
      ) : null}

      <div className="form-validate outside">
        <button form="declarationchoosed-form" type="submit">
          Valider
        </button>
      </div>

      <div className="span-user-selected-container">
        {userSelected ? (
          <div className="span-user-selected">
            {userSelected.lastname}
            <span
              onClick={() => {
                setUserToAnalyse({});
                setUserSelected(null);
              }}
            >
              <CloseIcon />
            </span>
          </div>
        ) : null}
      </div>
      {declarationChoosed && specialites && tranches ? (
        <div className="tables-container">
          <Tables
            key={userSelected}
            salaireBrut={salaireBrut}
            declaration={declarationChoosed}
            pole={pole}
            specialites={specialites}
            ponderation={ponderation}
            tranches={tranches}
            userSelected={userSelected}
          />
        </div>
      ) : null}
    </div>
  );
}
