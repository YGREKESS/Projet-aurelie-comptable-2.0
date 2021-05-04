import React from "react";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ModalPoleDelete from "./ModalPoleDelete";
import NotificationsIcon from "@material-ui/icons/Notifications";

export default function TablePolesSante({ poles, declarations }) {
  return (
    <MaterialTable
      title=""
      columns={[
        { title: "Nom", field: "name" },
        {
          render: (rowData) =>
            declarations
              .filter((declaration) => declaration.pole === rowData._id)
              .filter((declaration) => declaration.type === "Praticien")
              .filter((declaration) => declaration.seen === false).length >
            0 ? (
              <NotificationsIcon style={{ color: "red" }} />
            ) : (
              ""
            ),
        },
        {
          title: "",
          field: "",
          render: (rowData) => (
            <div style={{ display: "flex" }}>
              <Link
                className="button"
                style={{
                  marginLeft: "",
                  margin: ".5rem 0 0 auto",
                  background: "#379CE5",
                }}
                to={{
                  pathname: `/mon-espace/admin/poles-sante/pole=${rowData._id}/infos-generales`,
                }}
              >
                <SearchIcon />
              </Link>
              <ModalPoleDelete item={rowData} />
            </div>
          ),
        },
      ]}
      data={poles}
      options={{
        exportButton: false,
        headerStyle: {
          backgroundColor: "#18212D",
          fontSize: "18px",
          color: "#FFF",
        },
      }}
      style={{
        width: "100%",
        height: "100%",
        boxShadow: "none",
      }}
    />
  );
}
