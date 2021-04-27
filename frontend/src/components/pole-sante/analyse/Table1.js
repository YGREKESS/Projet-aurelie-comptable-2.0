import React, { useEffect } from "react";
import MaterialTable from "material-table";

export default function Table1({ columns, data }) {
  return (
    <MaterialTable
      title={"Charges mensuelles de surface"}
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
