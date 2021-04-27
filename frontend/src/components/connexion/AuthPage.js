import React, { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm";
import "../../1-css/AuthPage.css";
import { useDispatch, useSelector } from "react-redux";
import SigninForm from "./SigninForm";
import { getInfos } from "../../2-actions/userActions";
import Footer from "../Footer";

export default function Auth_Page(props) {
  const [form, setForm] = useState("register");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userLoginInfos } = userLogin;

  const userInfos = useSelector((state) => state.userInfos);
  const { loading, user, error } = userInfos;

  useEffect(() => {
    if (userLoginInfos) {
      if (!user) {
        dispatch(getInfos(userLoginInfos._id, userLoginInfos.token));
      }
      if (user) {
        props.history.push("/mon-espace/mon-compte");
      }
    }
    return () => {};
  }, [userLoginInfos, user]);

  return (
    <div className="auth_page">
      {!userLoginInfos ? <SigninForm props={props} /> : null}
    </div>
  );
}
