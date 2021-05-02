import React from "react";
import { useForm } from "react-hook-form";
import { addDeclaration } from "../../2-actions/declarationActions";
import { useDispatch, useSelector } from "react-redux";

export default function UserDeclarationForm({ user }) {
  const charges = [
    {
      title: "Loyer (€)",
      name: "loyer",
      /*       defaultValue: item.loyer.total,
       */ question: "Quel est le montant de votre loyer mensuel ? ",
    },
    {
      title: "Electricité (€)",
      name: "electricite",
      /*       defaultValue: item.electricite.total,
       */ question: "Montant de votre consommation mensuelle en éléctricité ?",
    },
    {
      title: "Eau (€)",
      name: "eau",
      /*       defaultValue: item.eau.total,
       */ question: "Montant de votre consommation mensuelle d'eau ?",
    },
    {
      title: "Fournitures administratives (€)",
      name: "fournAdmin",
      /*       defaultValue: item.fournAdmin.total,
       */ question:
        "Quelles sont vos dépenses mensuelles en fournitures administratives ?",
    },
    {
      title: "Fournitures entretien (€)",
      name: "fournEntr",
      /*       defaultValue: item.fournEntr.total,
       */ question:
        "Quelles sont vos dépenses mensuelles en fournitures pour l'entretien de vos locaux ?",
    },
    {
      title: "Ménage/entretien et réparations (€)",
      name: "menage",
      /*       defaultValue: item.menage.total,
       */ question:
        "Montant de vos dépenses pour le ménage et l'entretien/réparation de vos locaux ?",
    },
    {
      title: "Assurance (€)",
      name: "assurance",
      /*       defaultValue: item.assurance.total,
       */ question: "Montant de vos dépenses mensuelles en assurance ?",
    },
    {
      title: "Honoraires (€)",
      name: "honoraires",
      /*       defaultValue: item.honoraires.total,
       */ question: "Montant mensuel de vos honoraires ?",
    },
    {
      title: "Annonces et insertions (€)",
      name: "annoncesInsertions",
      /*       defaultValue: item.annoncesInsertions.total,
       */ question:
        "Montant de vos dépenses mensuelles en annonces et insertions ?",
    },
    {
      title: "Frais postaux (€)",
      name: "fraisPostaux",
      /*       defaultValue: item.fraisPostaux.total,
       */ question: "Montant mensuel de vos frais postaux ?",
    },
    {
      title: "Internet et téléphone (€)",
      name: "internetTelephone",
      /*       defaultValue: item.internetTelephone.total,
       */ question: "Vos dépenses mensuelles pour l'internet / téléphone ?",
    },
    {
      title: "Frais bancaires (€)",
      name: "fraisBancaires",
      /*       defaultValue: item.fraisBancaires.total,
       */ question: "Montant mensuel de vos frais bancaires ?",
    },
    {
      title: "CFE (€)",
      name: "cfe",
      /*       defaultValue: item.cfe.total,
       */ question: "Montant mensuel de votre CFE ?",
    },
    {
      title: "Réception/déplacement (€)",
      name: "receptionDeplacement",
      /*       defaultValue: item.receptionDeplacement.total,
       */ question:
        "Vos dépenses mensuelles pour vos réceptions et déplacements ? ?",
    },
    {
      title: "Petit équipement (€)",
      name: "petitEquipement",
      /*       defaultValue: item.petitEquipement.total,
       */ question: "Vos dépenses mensuelles pour le petit équipement ?",
    },
  ];
  const { register, handleSubmit, watch, errors } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const declaration = {
      user: user._id,
      pole: user.pole,
      title: data.title,
      type: "Praticien",
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
    dispatch(addDeclaration(declaration));
  };
  return (
    <form
      className="form user-declaration-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="div-form-group-container">
        <div className="form-group">
          <label htmlFor={"title"} className="">
            Titre
          </label>
          <div className="user-declaration-question-titre-input">
            <p>Quel titre souhaitez vous donner à cette déclaration ?</p>
            <input name="title" placeholder="" ref={register()} />
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
              <input name={input.name} placeholder="" ref={register()} />
            </div>
          </div>
        </div>
      ))}
      <div className="form-validate">
        <button>Valider</button>
      </div>
    </form>
  );
}
