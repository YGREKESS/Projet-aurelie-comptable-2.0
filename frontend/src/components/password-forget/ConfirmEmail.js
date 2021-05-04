import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Notifications, { notify } from "react-notify-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail, userSuccessReset } from "../../2-actions/userActions";

export default function ConfirmEmail() {
  const formUser = [
    {
      label: "Email",
      name: "email",
    },
  ];

  const dispatch = useDispatch();

  const userSendEmail = useSelector((state) => state.userSendEmail);
  const { success, error } = userSendEmail;

  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmit = (data) => {
    const email = {
      email: data.email,
    };
    dispatch(
      sendEmail({}, "Mot de passe oublié.", null, data.email, data.email)
    );
  };

  useEffect(() => {
    if (success) {
      notify.show(
        "Un email avec un lien de réinitialisation vient de vous être envoyé.",
        "success",
        5000
      );
      dispatch(userSuccessReset());
      reset({});
    }
    if (error) {
      notify.show(error, "error", 5000);
    }
    return () => {};
  }, [success, error]);

  return (
    <div className="password-update-page page home">
      <Notifications />
      <div style={{ width: "100%", margin: "2rem auto" }}>
        <p
          style={{
            width: "100%",
            margin: "auto",
            marginBottom: "0",
            background: "#379ce5",
            display: "block",
            width: "fit-content",
            padding: ".5rem",
            fontSize: "18px",
          }}
        >
          Saisissez votre adresse email.
        </p>
      </div>
      <form
        className="form password-update-form home"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formUser.map((input, i) => (
          <div className="div-form-group-container" key={i}>
            <div className="form-group">
              <label htmlFor={input.name} className="">
                {input.label}
              </label>
              <input
                name={input.name}
                placeholder=""
                defaultValue={""}
                ref={register()}
              />
            </div>
          </div>
        ))}
        <div className="form-validate">
          <button>Valider</button>
        </div>
      </form>
    </div>
  );
}
