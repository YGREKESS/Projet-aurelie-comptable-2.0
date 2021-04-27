import React, { useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable, { MTableToolbar } from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { markAsSeen } from "../../../2-actions/declarationActions";
import { formatDate } from "../../../utils";
import { useParams } from "react-router";

export default function ModalPraticienDeclaration({ praticien, declaration }) {
  const { id } = useParams();

  const poleSelected = useSelector((state) => state.poleSelected);
  const { pole } = poleSelected;

  const [title, setTitle] = useState(
    declaration.name
      ? declaration.name +
          " - " +
          praticien.lastname +
          " " +
          praticien.firstname +
          " - " +
          pole.name
      : "Déclaration du " +
          formatDate(declaration.date) +
          " - " +
          praticien.lastname +
          " " +
          praticien.firstname +
          " - " +
          pole.name
  );

  console.log(declaration);

  const [watchDeclaration, setWatchDeclaration] = useState(false);

  const dispatch = useDispatch();
  return (
    <>
      <ReactModal
        isOpen={watchDeclaration}
        className="modal-praticien-declaration modal"
        ariaHideApp={false}
        overlayClassName="overlay-praticien-declaration overlay"
        onRequestClose={() => {
          setWatchDeclaration(!watchDeclaration);
          if (declaration.seen === false) {
            dispatch(markAsSeen(declaration._id));
          }
        }}
      >
        <MaterialTable
          title={title}
          columns={[
            {
              title: "Charges (€)",
              field: "name",
              cellStyle: {
                background: "#379ce5",
                width: "5rem",
                color: "#ffff",
                fontWeight: "500",
                borderBottom: "3px solid #ffff",
              },
            },
            {
              title: "Total",
              field: "total",
              render: (rowData) => rowData.total + " €",
              cellStyle: {
                color: "#18212D",
                fontWeight: "300",
                borderBottomColor: "rgba(173, 173, 173, 0.3)",
                borderBottomWidth: "3px",
              },
            },
          ]}
          data={declaration.charges}
          options={{
            exportButton: true,
            search: false,
            paging: false,
            headerStyle: {
              backgroundColor: "#18212D",
              borderBottom: "none",
              fontSize: "18px",
              color: "#FFF",
            },
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
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
            ),
          }}
          style={{
            width: "100%",
            boxShadow: "none",
          }}
        />
      </ReactModal>
      <button
        onClick={() => {
          setWatchDeclaration(!watchDeclaration);
        }}
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
