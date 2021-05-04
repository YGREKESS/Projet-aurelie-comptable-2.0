import React, { useEffect, useState } from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import TimelineIcon from "@material-ui/icons/Timeline";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import { NavLink } from "react-router-dom";
import "../1-css/Navigator.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { getInfos, logout } from "../2-actions/userActions";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import GavelIcon from "@material-ui/icons/Gavel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { getAllDeclarations } from "../2-actions/declarationActions";

const categories = [
  {
    user: {
      id: "Praticien",
      children: [
        {
          id: "Mon compte",
          icon: <AccountBoxIcon />,
          link: "/mon-espace/mon-compte",
        },
        {
          id: "Mes déclarations",
          icon: <DnsRoundedIcon />,
          link: "/mon-espace/mes-declarations/historique",
        },
        {
          id: "Contact",
          icon: <RecentActorsIcon />,
          link: "/mon-espace/contact",
        },
        /* { id: "Analyse", icon: <TimelineIcon />, link: "/mon-espace/analyse" }, */
      ],
    },
  },
  {
    admin: {
      id: "Administrateur",
      children: [
        {
          id: "Mon compte",
          icon: <AccountBoxIcon />,
          link: "/mon-espace/mon-compte",
        },
        {
          id: "Pôles Santé",
          icon: <LocalHospitalIcon />,
          link: "/mon-espace/admin/poles-sante",
        },
        {
          id: "Liste utilisateurs",
          icon: <GroupIcon />,
          link: "/mon-espace/admin/liste-utilisateurs",
        },
        {
          id: "Données globales",
          icon: <SettingsIcon />,
          link: "/mon-espace/admin/donnees-globales",
        },
        {
          id: "CNIL",
          icon: <GavelIcon />,
          link: "/mon-espace/admin/cnil/mentions-legales",
        },
      ],
    },
  },
  {
    secretaire: {
      id: "Secrétaire",
      children: [
        {
          id: "Mon compte",
          icon: <AccountBoxIcon />,
          link: "/mon-espace/mon-compte",
        },
        {
          id: "Mon pôle",
          icon: <DnsRoundedIcon />,
          link: "/mon-espace/mes-declarations",
        },
        { id: "Analyse", icon: <TimelineIcon />, link: "/mon-espace/analyse" },
      ],
    },
  },
];

export default function Navigator() {
  const [display, setDisplay] = useState(0);

  const displayNavigator = () => {
    const displayState = display === 1 ? 0 : 1;
    setDisplay(displayState);
    const dashboard = document.getElementsByClassName("dashboard")[0];
    const page = document.getElementsByClassName("page")[0];
    if (displayState === 0) {
      page.style.width = "auto";
      dashboard.style.transform = "translateX(0)";
    } else {
      page.style.width = "100vw";
      dashboard.style.transform = "translateX(-15rem)";
    }
  };

  const allDeclarationsGet = useSelector((state) => state.allDeclarationsGet);
  const { loading, declarations = [], error } = allDeclarationsGet;

  const userInfos = useSelector((state) => state.userInfos);
  const { loading: loadingUser, user, error: errorUser } = userInfos;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getAllDeclarations());
    return () => {};
  }, []);

  return (
    <div className="navigator">
      <div className="navigator-trigger" onClick={() => displayNavigator()}>
        {display === 0 ? (
          <ArrowBackIcon style={{ fontSize: "40px" }} />
        ) : (
          <ArrowForwardIcon style={{ fontSize: "40px" }} />
        )}
      </div>
      <div className="navigator-list-container">
        <ul>
          <li className="title">Mon compte</li>
        </ul>
        {user ? (
          user.statut === "Praticien" ? (
            <ul className="user-navigator">
              <li className="category-title">{categories[0].user.id}</li>
              {categories[0].user.children.map((listItem, i) => (
                <NavLink
                  key={i}
                  className="category-links"
                  activeStyle={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  to={listItem.link}
                >
                  <li>
                    {listItem.icon}
                    {listItem.id}
                  </li>
                </NavLink>
              ))}
            </ul>
          ) : null
        ) : null}
        {user ? (
          user.statut === "Administrateur" ? (
            <ul className="admin-navigator">
              <li className="category-title">{categories[1].admin.id}</li>
              {categories[1].admin.children.map((listItem, i) => (
                <NavLink
                  key={i}
                  className="category-links"
                  activeStyle={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  to={listItem.link}
                >
                  <li>
                    {listItem.icon}
                    {listItem.id}
                    {listItem.id === "Pôles Santé" ? (
                      declarations
                        .filter(
                          (declaration) => declaration.type === "Praticien"
                        )
                        .filter((declaration) => declaration.seen === false)
                        .length > 0 ? (
                        <NotificationsIcon
                          style={{
                            color: "red",
                            fontSize: "20px",
                            marginLeft: ".5rem",
                          }}
                        />
                      ) : null
                    ) : null}
                  </li>
                </NavLink>
              ))}
            </ul>
          ) : null
        ) : null}
        <ul className="logout-navigator">
          <NavLink
            className="logout"
            activeStyle={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
            onClick={() => logoutHandler()}
            to={"/connexion"}
          >
            <li>
              <ExitToAppIcon />
              Me déconnecter
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
