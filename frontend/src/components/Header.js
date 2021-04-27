import React, { useEffect } from "react";
import "../1-css/AppBar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInfos } from "../2-actions/userActions";

function Header({ appBar }) {
  const userInfos = useSelector((state) => state.userInfos);
  const { loading, user, error } = userInfos;

  return (
    <div className="app-bar">
      <h2>
        <span>{user ? user.lastname : ""}</span> {user ? user.firstname : ""}
      </h2>
      <h2>{user ? user.statut : ""}</h2>
      <h1>{appBar.title}</h1>
      <ul>
        {appBar.links.map((link, i) => (
          <NavLink
            to={link.id}
            key={i}
            activeStyle={{ borderBottom: "3px solid #FFFF" }}
            exact
          >
            <li>{link.name}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}

export default Header;
