import React, { useEffect, useState } from "react";
import { register } from "../../2-actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../MessageBox";
import LoadingSpinner from "../LoadingSpinner";
import { getAllPole } from "../../2-actions/poleActions";

export default function RegisterForm({ props }) {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [pole, setPole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error } = userRegister;

  const allPolesGet = useSelector((state) => state.allPolesGet);
  const { loading: loadingPoles, poles, error: errorPoles } = allPolesGet;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      register({
        lastname: lastname,
        firstname: firstname,
        pole: pole,
        email: email,
        password: password,
      })
    );
  };

  useEffect(() => {
    if (!poles) {
      dispatch(getAllPole());
    }
    if (error) {
      setRegisterError(error);
    }
    if (success) {
      setLastname("");
      setFirstname("");
      setEmail("");
      setPassword("");
    }
    return () => {};
  }, [error, success, poles]);

  return (
    <div>
      <form
        onChange={() => setRegisterError("")}
        className="form register"
        onSubmit={submitHandler}
      >
        <h2>Inscription</h2>
        <div className="form-group">
          <input
            placeholder="Nom"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Prénom"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
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
        {loadingPoles ? (
          ""
        ) : errorPoles ? (
          ""
        ) : poles ? (
          <div className="form-group">
            <select
              onChange={(e) => setPole(e.target.value)}
              defaultValue="selection"
            >
              <option value="selection">Séléctionnez votre pôle</option>
              <option value="aucun">Aucun</option>
              {poles.map((pole, i) => (
                <option value={pole._id} key={i}>
                  {pole.name}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="validate-btn">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div>
              <button>Valider</button>
            </div>
          )}
        </div>
        <div className="message-container">
          {registerError && (
            <MessageBox style="danger" message={registerError} />
          )}
          {success && (
            <MessageBox style="success" message="Votre compte a été créé." />
          )}
        </div>
      </form>
    </div>
  );
}
