import React from "react";
import MaterialTable from "material-table";
import ModalUserInfos from "./ModalUserInfos";
import ModalUserDelete from "./ModalUserDelete";

export default function TableListeUtilisateurs({ users, poles, metiers }) {
  return (
    <MaterialTable
      title=""
      columns={[
        { title: "Nom", field: "lastname" },
        { title: "Prénom", field: "firstname" },
        { title: "Statut", field: "statut" },
        {
          title: "",
          field: "",
          render: (rowData) => (
            <div style={{ display: "flex" }}>
              <ModalUserInfos user={rowData} poles={poles} metiers={metiers} />
              <ModalUserDelete item={rowData} />
            </div>
          ),
        },
      ]}
      data={users}
      options={{
        exportButton: false,
        pageSize: 10,
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
