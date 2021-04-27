import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeclarations } from "../../2-actions/declarationActions";
import LoadingSpinner from "../LoadingSpinner";

export default function PoleSanteHeader({ poleId }) {
  const { id } = useParams();

  const allDeclarationsGet = useSelector((state) => state.allDeclarationsGet);
  const { loading, declarations, error } = allDeclarationsGet;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDeclarations(id));
    return () => {};
  }, []);

  const links = [
    {
      id: "Infos générales",
      path: `/mon-espace/admin/poles-sante/pole=${poleId}/infos-generales`,
    },
    {
      id: "Déclarations",
      path: `/mon-espace/admin/poles-sante/pole=${poleId}/declarations`,
    },
    {
      id: "Spécialités",
      path: `/mon-espace/admin/poles-sante/pole=${poleId}/specialites`,
    },
    {
      id: "Analyse",
      path: `/mon-espace/admin/poles-sante/pole=${poleId}/analyse`,
    },
  ];
  return (
    <div className="pole-sante-header">
      <ul>
        {links.map((link, i) => (
          <NavLink
            activeStyle={{ borderBottom: "3px solid #18202c" }}
            key={i}
            to={link.path}
          >
            <li>{link.id}</li>
          </NavLink>
        ))}

        <NavLink
          style={{ position: "relative" }}
          activeStyle={{ borderBottom: "3px solid #18202c" }}
          to={`/mon-espace/admin/poles-sante/pole=${poleId}/praticiens`}
        >
          <li>{"Praticiens"}</li>
          {declarations &&
          declarations
            .filter((declaration) => declaration.seen === false)
            .filter((declaration) => declaration.type === "Praticien").length >
            0 ? (
            <NotificationsIcon
              style={{
                position: "absolute",
                top: "-12px",
                right: "-9px",
                color: "red",
                fontSize: "18px",
              }}
            />
          ) : (
            ""
          )}
        </NavLink>
      </ul>
    </div>
  );
}
