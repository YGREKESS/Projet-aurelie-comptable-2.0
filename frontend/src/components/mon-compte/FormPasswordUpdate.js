import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Notifications, { notify } from "react-notify-toast";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, userSuccessReset } from "../../2-actions/userActions";

export default function FormPasswordUpdate() {
  const formUser = [
    {
      label: "Mot de passe actuel",
      name: "password",
    },
    {
      label: "Nouveau mot de passe",
      name: "newpassword1",
    },
    {
      label: "Confirmation du nouveau mot de passe",
      name: "newpassword2",
    },
  ];

  const userLogin = useSelector((state) => state.userLogin);
  const { userLoginInfos } = userLogin;

  const dispatch = useDispatch();

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { success, error } = userUpdatePassword;

  const { register, handleSubmit, reset, errors } = useForm();
  const onSubmit = (data) => {
    const password = {
      userId: userLoginInfos._id,
      password: data.password,
      newpassword1: data.newpassword1,
      newpassword2: data.newpassword2,
    };
    dispatch(updatePassword(password));
  };

  useEffect(() => {
    if (success) {
      notify.show("Votre mot de passe a été mis à jour.", "success", 5000);
      dispatch(userSuccessReset());
      reset({});
    }
    if (error) {
      notify.show(error, "error", 5000);
      dispatch(userSuccessReset());
    }
    return () => {};
  }, [success, error]);

  return (
    <div className="password-update-page page">
      <Notifications />
      <div style={{ width: "100%", marginBottom: "4rem" }}>
        <p style={{ width: "100%", marginBottom: "0" }}>
          Modifiez ci-dessous votre mot de passe.
        </p>
      </div>
      <form
        className="form password-update-form"
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
