import React from "react";
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

export default function ChartAnalyse() {
  const dataChart = [
    {
      name: "test5",
      Simulation: 82,
      Seghrouchni: 12,
    },
    {
      name: "test53",
      Simulation: 120,
      Seghrouchni: 12,
    },
    {
      name: "test521",
      Simulation: 210,
      Seghrouchni: 12,
    },
    {
      name: "test525",
      Simulation: 200,
      Seghrouchni: 12,
    },
    {
      name: "test5",
      Simulation: 82,
      Seghrouchni: 12,
    },
    {
      name: "test53",
      Simulation: 120,
      Seghrouchni: 12,
    },
    {
      name: "test521",
      Simulation: 210,
      Seghrouchni: 12,
    },
    {
      name: "test525",
      Simulation: 200,
      Seghrouchni: 12,
    },
  ];

  const data = [
    {
      name: "Loyer",
      analyse: 13.99,
    },
    {
      name: "Electricité",
      analyse: 13.99,
    },
    {
      name: "Eau",
      analyse: 13.99,
    },
    {
      name: "Internet",
      analyse: 13.99,
    },
    {
      name: "Loyer",
      analyse: 13.99,
    },
    {
      name: "Electricité",
      analyse: 13.99,
    },
    {
      name: "Eau",
      analyse: 13.99,
    },
    {
      name: "Internet",
      analyse: 13.99,
    },
    {
      name: "Loyer",
      analyse: 13.99,
    },
    {
      name: "Electricité",
      analyse: 13.99,
    },
    {
      name: "Eau",
      analyse: 13.99,
    },
    {
      name: "Internet",
      analyse: 13.99,
    },
  ];

  const columns = [
    {
      title: "Charge",
      field: "name",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: {
        backgroundColor: "#039be5",
        color: "#FFFF",
        fontSize: "15px",
        padding: "16px 0",
        textAlign: "center",
      },
    },
    {
      title: "Analyse",
      field: "analyse",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: {
        fontSize: "14px",
        padding: "16px 0",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
  ];

  const pdfDownload = () => {
    domtoimage
      .toBlob(document.getElementById("to-pdf"), {
        width: 1000,
        height: 1600,
      })
      .then(function (blob) {
        saveAs(blob, "my-node.png");
      });
  };

  return (
    <div className="chart-analyse-page">
      <button className="print-button" onClick={pdfDownload}>
        Download as pdf
      </button>
      <div id={"to-pdf"} className="to-pdf">
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
              <Legend />
              <Bar dataKey="Seghrouchni" fill="#8884d8" />
              <Bar dataKey="Simulation" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <MaterialTable
          title=""
          columns={columns}
          data={data}
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
    </div>
  );
}
