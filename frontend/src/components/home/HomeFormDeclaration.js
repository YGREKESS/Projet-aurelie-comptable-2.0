import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  addDeclaration,
  resetSuccessDeclaration,
} from "../../2-actions/declarationActions";
import { getInfos } from "../../2-actions/userActions";
import imageMeeting from "../../images/meeting.png";
import imagePencil from "../../images/pencil.png";
import { getOnePole } from "../../2-actions/poleActions";

export default function HomeFormDeclaration() {
  const { userid } = useParams();

  const declarationAdd = useSelector((state) => state.declarationAdd);
  const {
    loading: loadingAdd,
    success: successAdd,
    error: errorAdd,
  } = declarationAdd;

  const poleSelected = useSelector((state) => state.poleSelected);
  const { loading, pole, error } = poleSelected;

  const userInfos = useSelector((state) => state.userInfos);
  const { loading: loadingUser, user, error: errorUser } = userInfos;

  const charges = [
    {
      title: "Loyer (€)",
      name: "loyer",
      question: "Quel est le montant de votre loyer mensuel ? ",
    },
    {
      title: "Electricité (€)",
      name: "electricite",
      question: "Montant de votre consommation mensuelle en éléctricité ?",
    },
    {
      title: "Eau (€)",
      name: "eau",
      question: "Montant de votre consommation mensuelle d'eau ?",
    },
    {
      title: "Fournitures administratives (€)",
      name: "fournAdmin",
      question:
        "Quelles sont vos dépenses mensuelles en fournitures administratives ?",
    },
    {
      title: "Fournitures entretien (€)",
      name: "fournEntr",
      question:
        "Quelles sont vos dépenses mensuelles en fournitures pour l'entretien de vos locaux ?",
    },

    {
      title: "Ménage/entretien et réparations (€)",
      name: "menage",
      question:
        "Montant de vos dépenses pour le ménage et l'entretien/réparation de vos locaux ?",
    },
    {
      title: "Assurance (€)",
      name: "assurance",
      question: "Montant de vos dépenses mensuelles en assurance ?",
    },
    {
      title: "Honoraires (€)",
      name: "honoraires",
      question: "Montant mensuel de vos honoraires ?",
    },
    {
      title: "Annonces et insertions (€)",
      name: "annoncesInsertions",
      question:
        "Montant de vos dépenses mensuelles en annonces et insertions ?",
    },
    {
      title: "Frais postaux (€)",
      name: "fraisPostaux",
      question: "Montant mensuel de vos frais postaux ?",
    },

    {
      title: "Internet et téléphone (€)",
      name: "internetTelephone",
      question: "Vos dépenses mensuelles pour l'internet / téléphone ?",
    },
    {
      title: "Frais bancaires (€)",
      name: "fraisBancaires",
      question: "Montant mensuel de vos frais bancaires ?",
    },
    {
      title: "CFE (€)",
      name: "cfe",
      question: "Montant mensuel de votre CFE ?",
    },
    {
      title: "Réception/déplacement (€)",
      name: "receptionDeplacement",
      question: "Vos dépenses mensuelles pour vos réceptions et déplacements ?",
    },
    {
      title: "Petit équipement (€)",
      name: "petitEquipement",
      question: "Vos dépenses mensuelles pour le petit équipement ?",
    },
  ];
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const declaration = {
      user: userid,
      pole: user.pole,
      title: "",
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

  const { register: handleRegister, handleSubmit, reset, errors } = useForm({});

  useEffect(() => {
    if (!user) {
      dispatch(getInfos(userid));
    }
    if (user) {
      dispatch(getOnePole(user.pole));
    }
    if (successAdd) {
      reset({});
      dispatch(resetSuccessDeclaration());
    }
    return () => {};
  }, [successAdd, user]);

  return (
    <form
      id="home-declaration-form"
      className="form home-declaration-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {user && pole ? (
        <div className="user-details">
          <p>Nom : {user.lastname}</p>
          <p>Prénom : {user.firstname}</p>
          <p>Pôle : {pole.name}</p>
        </div>
      ) : null}
      {/*       <img className="img-pencil" src="/images/pencil.png" />
       */}{" "}
      <div className={`charge-part sous-part`}>
        {charges.map((charge, i) => (
          <div className="div-form-group-container" key={i}>
            <div className="form-group">
              <label>{charge.title}</label>
              <div className="home-declaration-question-input">
                <p>{charge.question}</p>
                <input
                  name={charge.name}
                  placeholder=""
                  ref={handleRegister()}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="validation-part sous-part">
          <img className="img-meeting" src="/images/meeting.png" />

          <h2>Validation</h2>
          <div className="div-form-group-container">
            <div className="form-group">
              <div className="">
                <p>
                  <input
                    type="checkbox"
                    name={"rgpd"}
                    placeholder=""
                    className={errors.rgpd ? "error" : ""}
                    ref={handleRegister({
                      required: true,
                    })}
                  />
                  En validant votre déclaration, vous acceptez que vos données
                  soient stockées et analysées dans le but de vous proposer un
                  accompagnement adapté à votre situation.
                </p>
                {errors.rgpd && (
                  <span className="error">
                    Merci d'accepter les conditions avant de valider votre
                    déclaration.
                  </span>
                )}
              </div>
            </div>
          </div>
          <button form="home-declaration-form" type="submit">
            Valider ma déclaration
          </button>
        </div>
      </div>
    </form>
  );
}
