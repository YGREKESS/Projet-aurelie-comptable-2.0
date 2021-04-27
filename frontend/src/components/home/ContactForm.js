import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { sendEmail, userSuccessReset } from "../../2-actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Notifications, { notify } from "react-notify-toast";

export default function ContactForm({ auth = false, from = true }) {
  const userInfos = useSelector((state) => state.userInfos);
  const { loading: loadingUser, user, error: errorUser } = userInfos;

  const userSendEmail = useSelector((state) => state.userSendEmail);
  const {
    loading: loadingEmail,
    success: successSend,
    error: errorSend,
  } = userSendEmail;

  const { register, handleSubmit, reset, errors } = useForm({});

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const message = {
      lastname: from ? data.lastname : user.lastname,
      firstname: from ? data.firstname : user.firstname,
      from: from ? data.from : user.email,
      subject: data.subject,
      message: data.message,
    };
    dispatch(sendEmail(null, "Demande d'information.", message, null, null));
  };

  useEffect(() => {
    if (successSend) {
      notify.show("Le message a été envoyé !", "success", 3000);
      dispatch(userSuccessReset());
      reset({});
    }
    if (errorSend) {
      notify.show(errorSend, "error", 3000);
    }
    return () => {};
  }, [successSend, errorSend]);

  return (
    <form
      className={"contact-form" + (auth ? " auth" : "")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Notifications />
      {from ? (
        <div className="last-firstname-container">
          <div className="form-group">
            <label>Nom</label>
            <input name="lastname" ref={register()} />
          </div>
          <div className="form-group">
            <label>Prénom</label>
            <input name="firstname" ref={register()} />
          </div>
        </div>
      ) : null}
      {from ? (
        <div className="form-group">
          <label>Email</label>
          <input name="from" ref={register()} />
        </div>
      ) : null}
      <div className="form-group">
        <label>Sujet</label>
        <input
          name="subject"
          placeholder="Inscription, déclaration, (...)"
          ref={register()}
        />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea name="message" rows={8} ref={register()} />
      </div>
      <div className="form-validate">
        <button type="submit">Envoyer</button>
      </div>
    </form>
  );
}
