import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Notifications, { notify } from "react-notify-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { userSuccessReset, updatePassword } from "../../2-actions/userActions";

export default function UpdatePassword() {
  const { id } = useParams();
  const formUser = [
    {
      label: "Nouveau mot de passe",
      name: "newpassword1",
    },
    {
      label: "Confirmation du nouveau mot de passe",
      name: "newpassword2",
    },
  ];

  const dispatch = useDispatch();

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { loading, success, error } = userUpdatePassword;

  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmit = (data) => {
    const password = {
      userId: id,
      newpassword1: data.newpassword1,
      newpassword2: data.newpassword2,
    };
    dispatch(updatePassword(password));
  };

  useEffect(() => {
    console.log(id);
    if (success) {
      notify.show("Votre mot de passe a été mis à jour.", "success", 5000);
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
          Modifiez ci-dessous votre mot de passe.
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
                type="password"
                placeholder=""
                defaultValue={""}
                ref={register()}
              />
            </div>
          </div>
        ))}
        <div className="form-validate">
          <button>Mettre à jour</button>
        </div>
      </form>
    </div>
  );
}
