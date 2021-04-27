import React from "react";
import MaterialTable from "material-table";

export default function Table2({ columns, data, pole, userSelected }) {
  return (
    <MaterialTable
      title={
        "Charges mensuelles de fonctionnement par praticien" +
        (userSelected
          ? ` - ${pole.name} - ${userSelected.lastname} ${userSelected.firstname}`
          : "")
      }
      columns={columns}
      data={data}
      options={{
        paging: false,
        search: false,
        exportButton: true,
        headerStyle: {
          backgroundColor: "#18212D",
          fontSize: "18px",
          color: "#FFF",
          borderBottom: "none",
        },
      }}
      style={{
        width: "100%",
        boxShadow: "none",
        padding: "0",
      }}
    />
  );
}
