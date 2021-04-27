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
      defaultValue: item.loyer.total,
      question: "Montant de votre loyer mensuel : ",
    },
    {
      title: "Electricité (€)",
      name: "electricite",
      defaultValue: item.electricite.total,
      question: "Montant de votre consommation mensuelle en éléctricité :",
    },
    {
      title: "Eau (€)",
      name: "eau",
      defaultValue: item.eau.total,
      question: "Montant de votre consommation mensuelle d'eau :",
    },
    {
      title: "Fournitures administratives (€)",
      name: "fournAdmin",
      defaultValue: item.fournAdmin.total,
      question: "Dépenses mensuelles en fournitures administratives :",
    },
    {
      title: "Fournitures entretien (€)",
      name: "fournEntr",
      defaultValue: item.fournEntr.total,
      question:
        "Dépenses mensuelles en fournitures pour l'entretien de vos locaux :",
    },
    {
      title: "Ménage/entretien et réparations (€)",
      name: "menage",
      defaultValue: item.menage.total,
      question:
        "Vos dépenses pour le ménage et l'entretien/réparation de vos locaux :",
    },
    {
      title: "Assurance (€)",
      name: "assurance",
      defaultValue: item.assurance.total,
      question: "Montant de vos dépenses mensuelles en assurance :",
    },
    {
      title: "Honoraires (€)",
      name: "honoraires",
      defaultValue: item.honoraires.total,
      question: "Montant mensuel de vos honoraires :",
    },
    {
      title: "Annonces et insertions (€)",
      name: "annoncesInsertions",
      defaultValue: item.annoncesInsertions.total,
      question:
        "Montant de vos dépenses mensuelles en annonces et insertions :",
    },
    {
      title: "Frais postaux (€)",
      name: "fraisPostaux",
      defaultValue: item.fraisPostaux.total,
      question: "Montant mensuel de vos frais postaux :",
    },
    {
      title: "Internet et téléphone (€)",
      name: "internetTelephone",
      defaultValue: item.internetTelephone.total,
      question: "Vos dépenses mensuelles pour l'internet / téléphone :",
    },
    {
      title: "Frais bancaires (€)",
      name: "fraisBancaires",
      defaultValue: item.fraisBancaires.total,
      question: "Montant mensuel de vos frais bancaires :",
    },
    {
      title: "CFE (€)",
      name: "cfe",
      defaultValue: item.cfe.total,
      question: "Montant mensuel de votre CFE :",
    },
    {
      title: "Réception/déplacement (€)",
      name: "receptionDeplacement",
      defaultValue: item.receptionDeplacement.total,
      question: "Vos dépenses mensuelles pour vos réceptions et déplacements :",
    },
    {
      title: "Petit équipement (€)",
      name: "petitEquipement",
      defaultValue: item.petitEquipement.total,
      question: "Vos dépenses mensuelles pour le petit équipement :",
    },
  ];
  const [update, setUpdateDeclaration] = useState(false);

  const dispatch = useDispatch();

  const { register, handleSubmit, reset, errors } = useForm({});
  const onSubmit = (data) => {
    const declarationUpdated = {
      pole: item.pole,
      name: data.name,
      loyer: {
        total: data.loyer,
        repartition: data.loyerRep,
      },
      electricite: {
        total: data.electricite,
        repartition: data.electriciteRep,
      },
      eau: {
        total: data.eau,
        repartition: data.eauRep,
      },
      fournAdmin: {
        total: data.fournAdmin,
        repartition: data.fournAdminRep,
      },
      fournEntr: {
        total: data.fournEntr,
        repartition: data.fournEntrRep,
      },
      menage: {
        total: data.menage,
        repartition: data.menageRep,
      },
      assurance: {
        total: data.assurance,
        repartition: data.assuranceRep,
      },
      honoraires: {
        total: data.honoraires,
        repartition: data.honorairesRep,
      },
      annoncesInsertions: {
        total: data.annoncesInsertions,
        repartition: data.annoncesInsertionsRep,
      },
      fraisPostaux: {
        total: data.fraisPostaux,
        repartition: data.fraisPostauxRep,
      },
      internetTelephone: {
        total: data.internetTelephone,
        repartition: data.internetTelephoneRep,
      },
      fraisBancaires: {
        total: data.fraisBancaires,
        repartition: data.fraisBancairesRep,
      },
      cfe: {
        total: data.cfe,
        repartition: data.cfeRep,
      },
      receptionDeplacement: {
        total: data.receptionDeplacement,
        repartition: data.receptionDeplacementRep,
      },
      petitEquipement: {
        total: data.petitEquipement,
        repartition: data.petitEquipementRep,
      },
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
              <label htmlFor="name" className="">
                Titre
              </label>
              <div className="user-declaration-question-titre-input">
                <p>Titre de votre déclaration :</p>
                <input
                  name="name"
                  placeholder="Ex. Déclaration du 12/12/12"
                  defaultValue={item.name}
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
