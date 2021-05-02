import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";
import { updateDeclaration } from "../../2-actions/declarationActions";
import { useDispatch, useSelector } from "react-redux";

export default function ModalDeclarationUpdate({ item }) {
  const charges = [
    {
      title: "Loyer (€)",
      name: "loyer",
      defaultValue: item.charges[0].total,
      question: "Montant de votre loyer mensuel : ",
    },
    {
      title: "Electricité (€)",
      name: "electricite",
      defaultValue: item.charges[1].total,
      question: "Montant de votre consommation mensuelle en éléctricité :",
    },
    {
      title: "Eau (€)",
      name: "eau",
      defaultValue: item.charges[2].total,
      question: "Montant de votre consommation mensuelle d'eau :",
    },
    {
      title: "Fournitures administratives (€)",
      name: "fournAdmin",
      defaultValue: item.charges[3].total,
      question: "Dépenses mensuelles en fournitures administratives :",
    },
    {
      title: "Fournitures entretien (€)",
      name: "fournEntr",
      defaultValue: item.charges[4].total,
      question:
        "Dépenses mensuelles en fournitures pour l'entretien de vos locaux :",
    },
    {
      title: "Ménage/entretien et réparations (€)",
      name: "menage",
      defaultValue: item.charges[5].total,
      question:
        "Vos dépenses pour le ménage et l'entretien/réparation de vos locaux :",
    },
    {
      title: "Assurance (€)",
      name: "assurance",
      defaultValue: item.charges[6].total,
      question: "Montant de vos dépenses mensuelles en assurance :",
    },
    {
      title: "Honoraires (€)",
      name: "honoraires",
      defaultValue: item.charges[7].total,
      question: "Montant mensuel de vos honoraires :",
    },
    {
      title: "Annonces et insertions (€)",
      name: "annoncesInsertions",
      defaultValue: item.charges[8].total,
      question:
        "Montant de vos dépenses mensuelles en annonces et insertions :",
    },
    {
      title: "Frais postaux (€)",
      name: "fraisPostaux",
      defaultValue: item.charges[9].total,
      question: "Montant mensuel de vos frais postaux :",
    },
    {
      title: "Internet et téléphone (€)",
      name: "internetTelephone",
      defaultValue: item.charges[10].total,
      question: "Vos dépenses mensuelles pour l'internet / téléphone :",
    },
    {
      title: "Frais bancaires (€)",
      name: "fraisBancaires",
      defaultValue: item.charges[11].total,
      question: "Montant mensuel de vos frais bancaires :",
    },
    {
      title: "CFE (€)",
      name: "cfe",
      defaultValue: item.charges[12].total,
      question: "Montant mensuel de votre CFE :",
    },
    {
      title: "Réception/déplacement (€)",
      name: "receptionDeplacement",
      defaultValue: item.charges[13].total,
      question: "Vos dépenses mensuelles pour vos réceptions et déplacements :",
    },
    {
      title: "Petit équipement (€)",
      name: "petitEquipement",
      defaultValue: item.charges[14].total,
      question: "Vos dépenses mensuelles pour le petit équipement :",
    },
  ];
  const [update, setUpdateDeclaration] = useState(false);

  const dispatch = useDispatch();

  const { register, handleSubmit, reset, errors } = useForm({});
  const onSubmit = (data) => {
    const declarationUpdated = {
      pole: item.pole,
      title: data.title,
      charges: [
        {
          name: "Loyer",
          total: data.loyer,
        },
        {
          name: "Electricité",
          total: data.electricite,
        },
        {
          name: "Eau",
          total: data.eau,
        },
        {
          name: "Fourn. administratives",
          total: data.fournAdmin,
        },
        {
          name: "Fourn. entretien",
          total: data.fournEntr,
        },
        {
          name: "Ménage",
          total: data.menage,
        },
        {
          name: "Assurance",
          total: data.assurance,
        },
        {
          name: "Honoraires",
          total: data.honoraires,
        },
        {
          name: "Annonces / Insertions",
          total: data.annoncesInsertions,
        },
        {
          name: "Frais postaux",
          total: data.fraisPostaux,
        },
        {
          name: "Internet / Téléphone",
          total: data.internetTelephone,
        },
        {
          name: "Frais bancaires",
          total: data.fraisBancaires,
        },
        {
          name: "CFE",
          total: data.cfe,
        },
        {
          name: "Réception / Déplacement",
          total: data.receptionDeplacement,
        },
        {
          name: "Petit équipement",
          total: data.petitEquipement,
        },
      ],
    };
    dispatch(updateDeclaration(item._id, declarationUpdated));
  };

  useEffect(() => {
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
          className="form user-declaration-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="div-form-group-container">
            <div className="form-group">
              <label htmlFor="title" className="">
                Titre
              </label>
              <div className="user-declaration-question-titre-input">
                <p>Titre de votre déclaration :</p>
                <input
                  name="title"
                  placeholder="Ex. Déclaration du 12/12/12"
                  defaultValue={item.title}
                  ref={register()}
                />
              </div>
            </div>
          </div>
          {charges.map((input, i) => (
            <div className="div-form-group-container" key={i}>
              <div className="form-group">
                <label htmlFor={input.name} className="">
                  {input.title}
                </label>
                <div className="user-declaration-question-input">
                  <p>{input.question}</p>
                  <input
                    name={input.name}
                    placeholder=""
                    defaultValue={input.defaultValue}
                    ref={register()}
                  />
                </div>
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
