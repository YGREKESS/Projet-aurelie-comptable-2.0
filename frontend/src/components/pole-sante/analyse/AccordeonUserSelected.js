import React, { useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { useForm } from "react-hook-form";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import { formatDate } from "../../../utils";

export default function AccordeonUserSelected({
  praticiens,
  declarations,
  userSelected,
  setUserSelected,
  userToAnalyse,
  setUserToAnalyse,
}) {
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, errors } = useForm({});

  const onSubmit = (data) => {
    if (userToAnalyse._id) {
      if (userToAnalyse.declaration) {
        setUserSelected(userToAnalyse);
      } else {
        setError("Merci de sélectionner une déclaration.");
      }
    } else {
      setError("Merci de sélectionner un praticien.");
    }
  };

  return (
    <Accordion
      className="accordion-user-selected"
      style={{
        boxShadow: "none",
        borderBottom: "1px solid rgba(128, 128, 128, 0.295)",
      }}
    >
      <AccordionSummary>
        <ExpandMoreIcon
          style={{ fontSize: "50px", color: "#379ce5", margin: "auto" }}
        />
      </AccordionSummary>
      <AccordionDetails style={{ display: "block" }}>
        <form
          className="form userselected-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <h2>Liste des praticiens</h2>
            <div className="praticiens-container">
              <ul>
                {praticiens.map((praticien, i) => (
                  <li
                    className={
                      userToAnalyse._id === praticien._id ? "active" : ""
                    }
                    key={i}
                    onClick={() => {
                      setError("");
                      setUserToAnalyse(praticien);
                    }}
                  >
                    {praticien.lastname}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="form-group">
            <h2>Liste des déclarations</h2>
            {userToAnalyse._id ? (
              <div className="declarations-container">
                <ul>
                  {declarations
                    .filter(
                      (declaration) => declaration.user === userToAnalyse._id
                    )
                    .map((declaration, i) => (
                      <li
                        className={
                          userToAnalyse["declaration"]
                            ? userToAnalyse["declaration"]._id ===
                              declaration._id
                              ? "active"
                              : ""
                            : ""
                        }
                        key={i}
                        onClick={() => {
                          setError("");
                          let praticien = {
                            ...userToAnalyse,
                            declaration: declaration,
                          };
                          setUserToAnalyse(praticien);
                        }}
                      >
                        {declaration.title
                          ? declaration.title
                          : `Déclaration du ${formatDate(declaration.date)}`}
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <p>Rien à afficher.</p>
            )}
          </div>
          <div className="form-validate">
            <button
              className={userSelected ? "disabled" : ""}
              type="submit"
              disabled={userSelected ? true : false}
            >
              <AddIcon style={{ fontSize: "50px", color: "#ffff" }} />
            </button>
          </div>
        </form>
        {error ? <p className="danger">{error}</p> : ""}
      </AccordionDetails>
    </Accordion>
  );
}
