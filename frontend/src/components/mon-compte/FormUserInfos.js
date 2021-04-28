import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  sendEmail,
  updateInfos,
} from "../../2-actions/userActions";
import EmailIcon from "@material-ui/icons/Email";
import Notifications, { notify } from "react-notify-toast";

export default function FormUserInfos({
  user,
  token,
  poles,
  disabled = true,
  metiers,
  create = false,
  email = false,
}) {
  const { register, handleSubmit, reset, watch, errors } = useForm();
  const dispatch = useDispatch();

  const formUser = [
    {
      label: "Nom",
      name: "lastname",
      defaultValue: user ? user.lastname : "",
      disabled: false,
    },
    {
      label: "Prénom",
      name: "firstname",
      defaultValue: user ? user.firstname : "",
      disabled: false,
    },
    {
      label: "Téléphone",
      name: "phone",
      defaultValue: user ? user.phone : "",
      disabled: false,
    },
    {
      label: "Email",
      name: "email",
      defaultValue: user ? user.email : "",
      disabled: false,
    },
  ];

  const onSubmit = (data) => {
    const userObject = {
      lastname: data.lastname,
      firstname: data.firstname,
      phone: data.phone ? data.phone : "00-00-00-00-00",
      email: data.email,
      pole: data.pole ? data.pole : user.pole,
      specialite: data.specialite,
      statut: data.statut ? data.statut : user.statut,
    };
    if (!create) {
      userObject["_id"] = user._id;
      dispatch(updateInfos(userObject, token));
    } else {
      userObject["password"] = "azerty";
      dispatch(createUser(userObject, token));
    }
  };

  return (
    <>
      <Notifications />
      <form className="form user-infos-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-user-infos-part">
          <div className="div-form-group-container">
            <div className="form-group">
              <label>Pôle</label>
              {(user && poles) || create ? (
                <select
                  name="pole"
                  className={disabled ? "disabled" : ""}
                  defaultValue={user ? user.pole : "aucun"}
                  ref={register()}
                  disabled={disabled ? true : false}
                >
                  <option value="aucun">Aucun</option>
                  {poles.map((pole, i) => (
                    <option value={pole._id} key={i}>
                      {pole.name}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          </div>
          <div className="div-form-group-container">
            <div className="form-group">
              <label>Statut</label>
              {user || create ? (
                <select
                  name="statut"
                  className={disabled ? "disabled" : ""}
                  defaultValue={user ? user.statut : "Praticien"}
                  ref={register()}
                  disabled={disabled ? true : false}
                >
                  <option value={"Administrateur"}>Administrateur</option>
                  <option value={"Praticien"}>Praticien</option>
                </select>
              ) : null}
            </div>
          </div>
          <div className="div-form-group-container">
            <div className="form-group">
              <label>Spécialité</label>
              {(user && metiers) || create ? (
                <select
                  name="specialite"
                  defaultValue={user ? user.specialite : "Aucune"}
                  ref={register()}
                >
                  {metiers.map((metier, i) => (
                    <option value={metier.name} key={i}>
                      {metier.name}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          </div>
        </div>
        <div className="form-user-infos-part">
          {formUser.map((input, i) => (
            <div className="div-form-group-container" key={i}>
              <div className="form-group">
                <label htmlFor={input.name} className="">
                  {input.label}
                </label>
                <input
                  name={input.name}
                  className={input.disabled ? "disabled" : ""}
                  placeholder=""
                  defaultValue={input.defaultValue}
                  disabled={input.disabled}
                  ref={register()}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="form-validate">
          <button>{create ? "Valider" : "Mettre à jour"}</button>
        </div>
      </form>
      {email ? (
        <div className="send-email-part">
          <div className="send-email-part-header">
            <EmailIcon style={{ fontSize: "40px", color: "#379ce5" }} />
            <p>Envoyer un email à l'utilisateur.</p>
          </div>
          <div className="button-container">
            <button
              onClick={() =>
                dispatch(
                  sendEmail(
                    user,
                    "Lien de rédaction de votre déclaration.",
                    null,
                    user.email,
                    null
                  )
                )
              }
            >
              Envoyer un lien pour la rédaction d'une déclaration.
            </button>
            <button
              onClick={() =>
                dispatch(
                  sendEmail(
                    user,
                    "Connexion à votre compte utilisateur.",
                    null,
                    user.email,
                    null
                  )
                )
              }
            >
              Envoyer un mail contenant les informations de connexion au compte.
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
