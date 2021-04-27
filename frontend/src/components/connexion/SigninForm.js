import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { login } from "../../2-actions/userActions";
import LoadingSpinner from "../LoadingSpinner";
import MessageBox from "../MessageBox";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinError, setSigninError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success } = userLogin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      setSigninError(error);
    }
    if (success) {
      setEmail("");
      setPassword("");
    }
    return () => {};
  }, [error]);

  return (
    <form
      className="form signin"
      onSubmit={submitHandler}
      onChange={() => setSigninError("")}
    >
      <h2>Connexion</h2>
      <div className="form-group">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="validate-btn">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <button>Valider</button>
          </div>
        )}
      </div>
      <div style={{ margin: "2rem 0" }}>
        <NavLink to={"/forget-password"}>Mot de passe oublié ?</NavLink>
      </div>
      <div className="message-container">
        {signinError && <MessageBox style="danger" message={signinError} />}
        {success && (
          <MessageBox style="success" message="Vous êtes connecté." />
        )}
      </div>
    </form>
  );
}
