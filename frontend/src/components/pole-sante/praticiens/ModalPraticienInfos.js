import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import { formatDate } from "../../../utils";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {
  getAllDeclarations,
  markAsSeen,
  resetSuccessDeclaration,
} from "../../../2-actions/declarationActions";
import { getUserDeclarations } from "../../../2-actions/userActions";
import ModalPraticienDeclaration from "./ModalPraticienDeclaration";
import TablePraticienInfos from "./TablePraticienInfos";

export default function ModalPraticienInfos({ poleId, praticien }) {
  const [update, setUpdateSpecialite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <ReactModal
        isOpen={update}
        className="modal-praticien-infos modal"
        ariaHideApp={false}
        overlayClassName="overlay-update-specialite overlay"
        onRequestClose={() => {
          setUpdateSpecialite(!update);
        }}
      >
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <h4
              style={{
                padding: ".5rem 24px .5rem 24px",
                textAlign: "right",
                background: "#379ce5",
                display: "block",
                width: "fit-content",
                marginLeft: "auto",
                color: "#ffff",
              }}
            >
              {praticien.lastname + " " + praticien.firstname}
            </h4>
            <p style={{ paddingRight: "24px", textAlign: "right" }}>
              {praticien.specialite}
            </p>
            <p style={{ paddingRight: "24px", textAlign: "right" }}>
              {praticien.email}
            </p>
            <p style={{ paddingRight: "24px", textAlign: "right" }}>
              {praticien.phone}
            </p>
          </div>
          <TablePraticienInfos praticien={praticien} />
        </div>
      </ReactModal>
      <button
        onClick={() => setUpdateSpecialite(!update)}
        style={{
          marginLeft: "",
          margin: ".5rem 0 0 auto",
          background: "#379CE5",
        }}
      >
        <SearchIcon />
      </button>
    </>
  );
}
