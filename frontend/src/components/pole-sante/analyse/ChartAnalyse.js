import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import MaterialTable from "material-table";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function ChartAnalyse({ data_2, pole, userSelected }) {
  const [dataChart, setDataChart] = useState(
    data_2.filter((charge) => charge.name !== "Frais de fonctionnement mensuel")
  );
  const [dataTable, setDataTable] = useState(data_2);

  const columns = [
    {
      title: "Charge",
      field: "name",
      headerStyle: {
        display: "none",
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: (cellValue, rowData) => {
        return {
          backgroundColor: "#039be5",
          color: "#FFFF",
          fontSize: "15px",
          padding: "16px 0",
          textAlign: "center",
          fontWeight:
            rowData.name === "Frais de fonctionnement mensuel"
              ? "bold"
              : "normal",
        };
      },
      render: (rowData) => {
        if (rowData.name === "Frais de fonctionnement mensuel") {
          return "TOTAL";
        } else {
          return rowData.name;
        }
      },
    },
    {
      title: "Analyse",
      field: "analyse",
      headerStyle: {
        display: "none",
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: (cellValue, rowData) => {
        return {
          fontWeight: "bold",
          color: "#ffff",
          fontSize: "20px",
          padding: "16px 0",
          textAlign: "center",
          backgroundColor:
            cellValue > 0 ? "#fb5c5c" : cellValue < 0 ? "#589458" : "lightgray",
        };
      },
    },
  ];

  const pdfDownload = () => {
    const pdf = document.getElementById("to-pdf");
    domtoimage
      .toBlob(pdf, {
        width: pdf.scrollWidth,
        height: pdf.scrollHeight,
      })
      .then(function (blob) {
        saveAs(blob, `Analyse-${userSelected.lastname}`);
      });
  };

  useEffect(() => {
    setDataChart(
      data_2.filter(
        (charge) => charge.name !== "Frais de fonctionnement mensuel"
      )
    );
    setDataTable(data_2);

    return () => {};
  }, [data_2]);

  return (
    <Accordion
      className="accordion-chart-analyse"
      style={{
        marginTop: "4rem",
        boxShadow: "none",
        borderBottom: "1px solid rgba(128, 128, 128, 0.295)",
      }}
    >
      <AccordionSummary>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "auto" }}
        >
          <h2 style={{ width: "100%", color: "#379ce5", margin: "0" }}>PDF</h2>
          <ExpandMoreIcon
            style={{ fontSize: "50px", color: "#379ce5", margin: "auto" }}
          />
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ display: "block" }}>
        <div className="chart-analyse-page">
          <div id={"to-pdf"} className="to-pdf">
            <div className="user-details">
              <p>{userSelected.lastname + " " + userSelected.firstname}</p>
              <p>{pole.name}</p>
              <p>{userSelected.specialite}</p>
            </div>
            <div className="chart-container">
              <ResponsiveContainer
                width="100%"
                height="100%"
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <BarChart
                  width={500}
                  height={300}
                  data={dataChart}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    wrapperStyle={{
                      bottom: "-15px",
                      width: "100%",
                      whiteSpace: "nowrap",
                    }}
                  />
                  <Bar dataKey={userSelected.specialite} fill="#8884d8" />
                  <Bar dataKey={userSelected.lastname} fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <MaterialTable
              title=""
              columns={columns}
              data={dataTable}
              options={{
                paging: false,
                search: false,
                sorting: false,
                headerStyle: {
                  backgroundColor: "#18212D",
                  fontSize: "18px",
                  color: "#FFF",
                  borderBottom: "none",
                  textAlign: "center",
                },
              }}
              style={{
                width: "80%",
                margin: " 4rem auto",
                boxShadow: "none",
                padding: "0",
              }}
            />
          </div>
          <button className="print-button" onClick={pdfDownload}>
            Télécharger PDF
          </button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
