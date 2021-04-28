import React, { useEffect, useState } from "react";
import {
  calculRepartitionCharge,
  calculRepartitionRefSisa,
  calculRepartitionSalaire,
  calculRepartitionSurfaceCommuns,
  calculRepartitionSurfaceNonRep,
  calculRepartitionTaxeSalaire,
  repartitionName,
} from "../../../utils";
import ChartAnalyse from "./ChartAnalyse";
import Table1 from "./Table1";
import Table2 from "./Table2";
import Table3 from "./Table3";

export default function Tables({
  salaireBrut,
  specialites,
  pole,
  declaration,
  tranches,
  userSelected,
  ponderation,
}) {
  const calculTsTempsPlein = () => {
    const arrayPercent = [
      tranches.tranche1.tranche1percent / 100 - 0,
      tranches.tranche2.tranche2percent / 100 -
        tranches.tranche1.tranche1percent / 100,
      tranches.tranche3.tranche3percent / 100 -
        tranches.tranche2.tranche2percent / 100,
    ];

    const arrayPoint = [
      (salaireBrut * 12 - tranches.tranche3.tranche3point) * 2,
      (salaireBrut * 12 - tranches.tranche1.tranche1point) * 2,
      (salaireBrut * 12 - tranches.tranche2.tranche2point) * 2,
    ];

    const tsTempsPlein = (
      arrayPercent.reduce((totalValue, currentValue, i) => {
        return totalValue + currentValue * arrayPoint[i];
      }, 0) / 2
    ).toFixed(2);

    return Number(tsTempsPlein);
  };
  const [tsTempsPlein, setTsTempsPlein] = useState(calculTsTempsPlein());

  /* Répartitions options */
  const optionsSurfaceCommuns = [
    { title: "Parts égales", value: "partsEgales" },
    { title: "Recettes", value: "recettes" },
    { title: "Surface propre", value: "surfacePropre" },
  ];
  const optionsSurfaceNonRep = [
    { title: "Parts égales", value: "partsEgales" },
    { title: "Recettes", value: "recettes" },
    { title: "Surface propre", value: "surfacePropre" },
    { title: "100% Bailleur", value: "bailleur" },
    { title: "100% MG", value: "mg" },
  ];
  const repartitionChargesOptions = [
    { title: "Coef surface", value: "coefSurface" },
    { title: "Parts égales", value: "partsEgales" },
    { title: "Pondération", value: "ponderation" },
    { title: "Recettes", value: "recettes" },
  ];
  const repartitionOptions = [
    { title: "Coef surface", value: "coefSurface" },
    { title: "Parts égales", value: "partsEgales" },
    { title: "Pondération", value: "ponderation" },
    { title: "Recettes", value: "recettes" },
    { title: "Libre", value: "libre" },
  ];

  /* Colonnes pour chaque tableau */
  const columns_Table_1 = [
    {
      title: "",
      field: "name",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: {
        backgroundColor: "#039be5",
        color: "#FFFF",
        fontSize: "15px",
        padding: "16px",
      },
    },
    {
      title: "Total",
      field: "total",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: {
        fontSize: "14px",
        padding: "16px 0",
        paddingLeft: ".5rem",
        fontWeight: "bold",
      },
    },
    {
      title: "Rép.",
      field: "repartitionName",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: {
        fontSize: "14px",
        padding: "0 16px",
        backgroundColor: "#F9F9F9",
      },
    },
    {
      title: "",
      field: "repartition",
      export: false,
      headerStyle: {
        width: "auto",
        padding: "0",
        fontSize: "15px",
      },
      cellStyle: {
        width: "fit-content",
        padding: "0",
        fontSize: "14px",
      },
      render: (rowData) =>
        ["Surface communs", "Surface profession non représentée"].includes(
          rowData.name
        ) ? (
          <div className="form-group">
            <select
              defaultValue={rowData.repartition}
              onChange={(e) => {
                let data_1 = [...data_Table_1];

                data_1.find((row) => row.name == rowData.name).repartition =
                  e.target.value;

                data_1.find(
                  (row) => row.name == rowData.name
                ).repartitionName = repartitionName(e.target.value);

                if (rowData.name === "Surface communs") {
                  calcul_Data_1(data_1);
                } else {
                  calcul_Data_1(data_1);
                }
              }}
            >
              {rowData.name === "Surface communs"
                ? optionsSurfaceCommuns.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.title}
                    </option>
                  ))
                : optionsSurfaceNonRep.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.title}
                    </option>
                  ))}
            </select>
          </div>
        ) : (
          ""
        ),
    },
  ]
    .concat(
      specialites.map((specialite) => {
        return {
          title: specialite.name,
          field: specialite.name,
          headerStyle: {
            fontSize: "15px",
            padding: "16px 0",
          },
          cellStyle: (cellValue, rowData) => {
            return {
              fontSize: "14px",
              padding: "0",
              backgroundColor:
                rowData.name === "Nombre"
                  ? "#F9F9F9"
                  : rowData.name === "Recettes annuelles stat."
                  ? "#F9F9F9"
                  : "none",
            };
          },
          render: (rowData) =>
            rowData.name === "Nombre" ? (
              <input
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "#F9F9F9",
                }}
                defaultValue={rowData[specialite.name]}
                onChange={(e) => {
                  let data_1 = data_Table_1;

                  data_1.find((charge) => charge.name === "Nombre")[
                    specialite.name
                  ] = Number(e.target.value);

                  setData_Table_1(data_1);
                }}
                onBlur={() => calcul_Data_1(data_Table_1)}
              />
            ) : rowData.name === "Recettes annuelles stat." ? (
              <input
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "#F9F9F9",
                }}
                defaultValue={rowData[specialite.name]}
                onChange={(e) => {
                  let data_1 = data_Table_1;

                  data_1.find(
                    (charge) => charge.name === "Recettes annuelles stat."
                  )[specialite.name] = Number(e.target.value);

                  setData_Table_1(data_1);
                }}
                onBlur={() => calcul_Data_1(data_Table_1)}
              />
            ) : (
              <input
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                }}
                readOnly={true}
                value={rowData[specialite.name] ? rowData[specialite.name] : ""}
              />
            ),
        };
      })
    )
    .concat([
      {
        title: "Total annuel",
        field: "totalAnnuel",
        headerStyle: {
          fontSize: "15px",
          padding: "16px 0",
        },
        cellStyle: { fontSize: "14px", padding: "0", fontWeight: "bold" },
      },
      {
        title: "Fixe",
        field: "fixe",
        headerStyle: {
          fontSize: "15px",
          padding: "16px 0",
        },
        cellStyle: { fontSize: "14px", padding: "0" },
      },
    ]);
  const columns_Table_2 = [
    {
      title: "",
      field: "name",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: {
        backgroundColor: "#039be5",
        color: "#FFFF",
        fontSize: "15px",
        padding: "0 16px",
      },
    },
    {
      title: "Total",
      field: "total",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: (cellValue, rowData) => {
        return {
          fontSize: "14px",
          padding: "16px 0",
          backgroundColor:
            rowData.name === "Frais de fonctionnement mensuel"
              ? "none"
              : "#F9F9F9",
        };
      },
      render: (rowData) =>
        rowData.name === "Frais de fonctionnement mensuel" ? (
          <input
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              padding: "0 .5rem",
              fontWeight: "bold",
            }}
            readOnly={true}
            value={rowData.total}
          />
        ) : (
          <input
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              padding: "0 .5rem",
              fontWeight: "bold",
              backgroundColor: "#F9F9F9",
            }}
            defaultValue={rowData.total}
            onChange={(e) => {
              let data_2 = data_Table_2;

              data_2.find(
                (charge) => charge.name == rowData.name
              ).total = Number(e.target.value);

              setData_Table_2(data_2);
            }}
            onBlur={() => calcul_Data_2(data_Table_1)}
          />
        ),
    },
    {
      title: "Rép.",
      field: "repartitionName",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: {
        fontSize: "14px",
        padding: "0 16px",
        backgroundColor: "#F9F9F9",
      },
    },
    {
      title: "",
      field: "repartition",
      export: false,
      headerStyle: {
        width: "auto",
        padding: "0",
        fontSize: "15px",
      },
      cellStyle: {
        width: "fit-content",
        padding: "0",
        fontSize: "14px",
      },
      render: (rowData) =>
        rowData.name !== "Frais de fonctionnement mensuel" ? (
          <div className="form-group">
            <select
              defaultValue={rowData.repartition}
              onChange={(e) => {
                let data_2 = data_Table_2;

                data_2.find(
                  (charge) => charge.name == rowData.name
                ).repartition = e.target.value;

                data_2.find(
                  (item) => item.name == rowData.name
                ).repartitionName = repartitionName(e.target.value);

                calcul_Data_2(data_Table_1, data_2);
              }}
            >
              {repartitionChargesOptions.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.title}
                </option>
              ))}
            </select>
          </div>
        ) : (
          ""
        ),
    },
  ]
    .concat(
      userSelected
        ? specialites
            .filter((specialite) => specialite.name === userSelected.specialite)
            .map((specialite) => {
              return {
                title: specialite.name,
                field: specialite.name,
                headerStyle: {
                  fontSize: "15px",
                  padding: "16px 0",
                },
                cellStyle: { fontSize: "14px", padding: "0" },
              };
            })
        : specialites.map((specialite) => {
            return {
              title: specialite.name,
              field: specialite.name,
              headerStyle: {
                fontSize: "15px",
                padding: "16px 0",
              },
              cellStyle: { fontSize: "14px", padding: "0" },
            };
          })
    )
    .concat(
      userSelected
        ? [
            {
              title: userSelected.lastname,
              field: userSelected.lastname,
              headerStyle: {
                fontSize: "15px",
                padding: "16px 0",
              },
              cellStyle: (cellValue, rowData) => {
                return {
                  fontSize: "14px",
                  padding: "16px 0",
                  backgroundColor:
                    rowData.name === "Frais de fonctionnement mensuel"
                      ? "none"
                      : "#F9F9F9",
                };
              },
              render: (rowData) =>
                rowData.name === "Frais de fonctionnement mensuel" ? (
                  <input
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      padding: "0 .5rem",
                      fontWeight: "bold",
                    }}
                    readOnly={true}
                    value={rowData[userSelected.lastname]}
                  />
                ) : (
                  <input
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      padding: "0 .5rem",
                      fontWeight: "bold",
                      backgroundColor: "#F9F9F9",
                    }}
                    placeholder={rowData[userSelected.lastname]}
                    defaultValue={rowData[userSelected.lastname]}
                    onChange={(e) => {
                      let data_2 = data_Table_2;

                      data_2.find((charge) => charge.name == rowData.name)[
                        userSelected.lastname
                      ] = Number(e.target.value)
                        ? Number(e.target.value)
                        : e.target.value;

                      setData_Table_2(data_2);
                    }}
                    onBlur={() => calcul_Data_2(data_Table_1)}
                  />
                ),
            },
            {
              title: "Analyse",
              field: "analyse",
              headerStyle: {
                fontSize: "15px",
                padding: "16px 0",
              },
              cellStyle: (cellValue, rowData) => {
                return {
                  padding: "16px",
                  fontWeight: "bold",
                  color: "#ffff",
                  fontSize: "20px",
                  backgroundColor:
                    cellValue > 0
                      ? "#fb5c5c"
                      : cellValue < 0
                      ? "#589458"
                      : "lightgray",
                };
              },
            },
          ]
        : []
    )
    .concat(
      userSelected
        ? []
        : [
            {
              title: "Total annuel",
              field: "totalAnnuel",
              headerStyle: {
                fontSize: "15px",
                padding: "16px 0",
              },
              cellStyle: { fontSize: "14px", padding: "0", fontWeight: "bold" },
            },
            {
              title: "Fixe",
              field: "fixe",
              headerStyle: {
                fontSize: "15px",
                padding: "16px 0",
              },
              cellStyle: { fontSize: "14px", padding: "0" },
            },
          ]
    );
  const columns_Table_3 = [
    {
      title: "",
      field: "name",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: {
        backgroundColor: "#039be5",
        color: "#FFFF",
        fontSize: "15px",
        padding: "16px",
        cursor: "auto",
      },
    },
    {
      title: "Total",
      field: "total",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: (cellValue, rowData) => {
        return {
          fontSize: "14px",
          padding: "16px 0",
          paddingLeft: ".5rem",
          fontWeight: "bold",
          backgroundColor:
            rowData.name === "Refacturation charges à la SISA"
              ? "#F9F9F9"
              : "none",
        };
      },
      render: (rowData) =>
        rowData.name !== "Refacturation charges à la SISA" ? (
          <input
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              padding: "0 .5rem",
              fontWeight: "bold",
            }}
            readOnly={true}
            value={rowData.total}
          />
        ) : (
          <input
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              padding: "0 .5rem",
              fontWeight: "bold",
              backgroundColor: "#F9F9F9",
            }}
            defaultValue={2400}
            onChange={(e) => {
              let data_3 = data_Table_3;

              data_3.find(
                (charge) => charge.name === rowData.name
              ).total = Number(e.target.value);

              setData_Table_3(data_3);
            }}
            onBlur={() =>
              calcul_Data_3(
                data_Table_1,
                data_Table_2,
                data_Table_3[1]["repartition"],
                data_Table_3[3]["repartition"],
                data_Table_3[6]["repartition"],
                data_Table_3
              )
            }
          />
        ),
    },
    {
      title: "Rép.",
      field: "repartitionName",
      headerStyle: {
        fontSize: "15px",
        padding: "16px 0",
      },
      cellStyle: {
        fontSize: "14px",
        padding: "0 16px",
        backgroundColor: "#F9F9F9",
        cursor: "auto",
      },
    },
    {
      title: "",
      field: "repartition",
      export: false,
      headerStyle: {
        width: "auto",
        padding: "0",
        fontSize: "15px",
      },
      cellStyle: {
        width: "fit-content",
        padding: "0",
        fontSize: "14px",
        cursor: "auto",
      },
      render: (rowData) =>
        [
          "Salaire brut",
          "Taxe sur les salaires",
          "Refacturation charges à la SISA",
        ].includes(rowData.name) ? (
          <div className="form-group">
            <select
              defaultValue={rowData.repartition}
              onChange={(e) => {
                let data_3 = data_Table_3;

                data_3.find(
                  (charge) => charge.name == rowData.name
                ).repartition = e.target.value;

                data_3.find(
                  (charge) => charge.name == rowData.name
                ).repartitionName = repartitionName(e.target.value);

                if (rowData.name === "Salaire brut") {
                  calcul_Data_3(
                    data_Table_1,
                    data_Table_2,
                    e.target.value,
                    data_3[3]["repartition"],
                    data_3[6]["repartition"]
                  );
                } else if (rowData.name === "Taxe sur les salaires") {
                  calcul_Data_3(
                    data_Table_1,
                    data_Table_2,

                    data_3[1]["repartition"],
                    e.target.value,
                    data_3[6]["repartition"]
                  );
                } else if (rowData.name === "Refacturation charges à la SISA") {
                  calcul_Data_3(
                    data_Table_1,
                    data_Table_2,
                    data_3[1]["repartition"],
                    data_3[3]["repartition"],
                    e.target.value
                  );
                }
              }}
            >
              {rowData.name !== "Refacturation charges à la SISA"
                ? repartitionOptions.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.title}
                    </option>
                  ))
                : repartitionOptions
                    .filter((option) => option.title !== "Libre")
                    .map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.title}
                      </option>
                    ))}
            </select>
          </div>
        ) : (
          ""
        ),
    },
  ]
    .concat(
      specialites.map((specialite) => {
        return {
          title: specialite.name,
          field: specialite.name,
          headerStyle: {
            fontSize: "15px",
            padding: "16px 0",
          },
          cellStyle: (cellValue, rowData) => {
            return {
              fontSize: "14px",
              padding: "0",
              backgroundColor:
                rowData.name === "Nombre salariés en ETP" ? "#F9F9F9" : "none",
            };
          },
          render: (rowData) =>
            rowData.name !== "Nombre salariés en ETP" ? (
              <input
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                }}
                readOnly={true}
                value={rowData[specialite.name] ? rowData[specialite.name] : ""}
              />
            ) : (
              <input
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                  backgroundColor: "#F9F9F9",
                }}
                defaultValue={rowData[specialite.name]}
                onChange={(e) => {
                  let data_3 = data_Table_3;

                  data_3.find(
                    (charge) => charge.name === "Nombre salariés en ETP"
                  )[specialite.name] = Number(e.target.value);

                  setData_Table_3(data_3);
                }}
                onBlur={() =>
                  calcul_Data_3(
                    data_Table_1,
                    data_Table_2,
                    data_Table_3[1]["repartition"],
                    data_Table_3[3]["repartition"],
                    data_Table_3[6]["repartition"],
                    data_Table_3
                  )
                }
              />
            ),
        };
      })
    )
    .concat([
      {
        title: "Total annuel",
        field: "totalAnnuel",
        headerStyle: {
          fontSize: "15px",
          padding: "16px 0",
        },
        cellStyle: {
          fontSize: "14px",
          padding: "0",
          fontWeight: "bold",
          cursor: "auto",
        },
      },
      {
        title: "Fixe",
        field: "fixe",
        headerStyle: {
          fontSize: "15px",
          padding: "16px 0",
        },
        cellStyle: { fontSize: "14px", padding: "0", cursor: "auto" },
      },
    ]);

  /* Data pour chaque tableau */
  const [data_Table_1, setData_Table_1] = useState([
    {
      name: "Nombre",
      total: "",
      repartitionName: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Recettes annuelles stat.",
      total: "",
      repartitionName: "Pour 1 praticien",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Surface propre prof.",
      total: "",
      repartitionName: "Par corps de métier",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Surface communs",
      total: Math.round(Number(pole.surfaceCommuns)),
      repartitionName: repartitionName("partsEgales"),
      repartition: "partsEgales",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Surface profession non représentée",
      total: "",
      repartitionName: repartitionName("bailleur"),
      repartition: "bailleur",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Surface totale",
      total: pole.surfaceTotale,
      repartitionName: "Par corps de métier",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Surface par praticien",
      total: "",
      repartitionName: "Pour 1 praticien",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Coef. surface par praticien pr répartition Loyers",
      total: "",
      repartitionName: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Coef. Surface par praticien pr répar. Autres charges",
      total: "",
      repartitionName: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
  ]);
  const [data_Table_2, setData_Table_2] = useState(
    declaration.charges.map((charge, i) => {
      return {
        name: charge.name,
        total: charge.total,
        repartition: charge.repartition,
        repartitionName: repartitionName(charge.repartition),
        totalAnnuel: "",
        fixe: "",
      };
    })
  );
  const [data_Table_3, setData_Table_3] = useState([
    {
      name: "Nombre salariés en ETP",
      total:
        specialites.reduce((totalValue, currentValue, i) => {
          return (
            totalValue + currentValue.numbSalariesETP * currentValue.nombre
          );
        }, 0) / 35,
      repartitionName:
        Math.round(
          (specialites.reduce((totalValue, currentValue, i) => {
            return (
              totalValue + currentValue.numbSalariesETP * currentValue.nombre
            );
          }, 0) /
            35) *
            35
        ) + " heures / semaine à répartir",
      repartition: "",
      totalAnnuel: Math.round(
        specialites.reduce((totalValue, currentValue, i) => {
          return (
            totalValue + currentValue.numbSalariesETP * currentValue.nombre
          );
        }, 0) * 52
      ),
      fixe: "",
    },
    {
      name: "Salaire brut",
      total: (
        (specialites.reduce((totalValue, currentValue, i) => {
          return (
            totalValue +
            Number(currentValue.numbSalariesETP) * Number(currentValue.nombre)
          );
        }, 0) /
          35) *
        salaireBrut
      ).toFixed(2),
      repartitionName: repartitionName("libre"),
      repartition: "libre",
      fixe: "",
    },
    {
      name: "Charges patronales",
      total:
        (((Number(salaireBrut) *
          specialites.reduce((totalValue, currentValue, i) => {
            return (
              totalValue + currentValue.numbSalariesETP * currentValue.nombre
            );
          }, 0)) /
          35) *
          tranches.chargesSociales) /
        100,
      repartitionName: "",
      repartition: "",

      fixe: "",
    },
    {
      name: "Taxe sur les salaires",
      total: "",
      repartitionName: repartitionName("libre"),
      repartition: "libre",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Cout salarial",
      total: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "",
      total: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Refacturation charges à la SISA",
      total: 2400,
      repartitionName: repartitionName("ponderation"),
      repartition: "ponderation",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "",
      total: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Coût total mensuel net",
      total: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Coût total annuel net",
      total: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Répartition des charges en %",
      total: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "% Charges/Recettes",
      total: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
    {
      name: "Résultat",
      total: "",
      repartition: "",
      totalAnnuel: "",
      fixe: "",
    },
  ]);

  /* Calcul/Mise à jour de la data */
  const calcul_Data_1 = (table_1 = data_Table_1) => {
    let data_1 = [...table_1];
    /* Nombre */
    specialites.map((specialite, i) => {
      if (!data_1[0][specialite.name]) {
        data_1[0][specialite.name] = specialite.nombre;
      }
    });
    data_1[0]["total"] = specialites.reduce((totalValue, currentValue, i) => {
      return totalValue + data_1[0][currentValue.name];
    }, 0);

    /* Recettes annuelles stat. */
    specialites.map((specialite, i) => {
      if (!data_1[1][specialite.name]) {
        data_1[1][specialite.name] = specialite.honoraires;
      }
    });
    data_1[1]["total"] = specialites.reduce((totalValue, currentValue) => {
      return (
        totalValue + data_1[1][currentValue.name] * data_1[0][currentValue.name]
      );
    }, 0);

    /* Surface propre prof. */
    specialites.map((specialite, i) => {
      data_1[2][specialite.name] = specialite.surfPropreProf;
    });
    data_1[2]["total"] = specialites.reduce((totalValue, currentValue) => {
      return totalValue + currentValue.surfPropreProf;
    }, 0);

    /* Surface communs */
    const surfaceCommunsArray = specialites.map((specialite, i) => {
      return calculRepartitionSurfaceCommuns(
        data_1[3]["repartition"],
        pole.surfaceCommuns,
        specialite.surfPropreProf,
        data_1[2]["total"],
        data_1[1][specialite.name],
        data_1[1]["total"],
        data_1[0]["total"],
        data_1[0][specialite.name]
      );
    });
    specialites.map((specialite, i) => {
      data_1[3][specialite.name] = surfaceCommunsArray[i];
    });
    data_1[3]["total"] = Math.round(
      surfaceCommunsArray.reduce((totalValue, currentValue) => {
        return totalValue + Number(currentValue);
      }, 0)
    );

    /* Surface profession non représentée */
    const profNonRepresenteeTotal = specialites.reduce(
      (totalValue, currentValue, i) => {
        return (
          totalValue +
          (data_1[0][currentValue.name] === 0
            ? Math.round(
                Number(currentValue.surfPropreProf) +
                  Number(surfaceCommunsArray[i])
              )
            : 0)
        );
      },
      0
    );
    const profNonRepresenteeArray = specialites.map((specialite, i) => {
      return calculRepartitionSurfaceNonRep(
        data_1[4]["repartition"],
        surfaceCommunsArray[i],
        specialite.surfPropreProf,
        profNonRepresenteeTotal,
        pole.surfaceTotale,
        data_1[1][specialite.name],
        data_1[1]["total"],
        data_1[0]["total"],
        data_1[0][specialite.name],
        specialite.name
      );
    });
    data_1[4]["total"] = profNonRepresenteeTotal;
    specialites.map((specialite, i) => {
      data_1[4][specialite.name] =
        profNonRepresenteeArray[i] === 0 ? "0.00" : profNonRepresenteeArray[i];
    });

    /* Surface totale */
    specialites.map((specialite, i) => {
      data_1[5][specialite.name] =
        data_1[0][specialite.name] === 0
          ? "0.00"
          : Math.round(
              specialite.surfPropreProf +
                Number(surfaceCommunsArray[i]) +
                Number(profNonRepresenteeArray[i])
            );
    });

    /* Surface par praticien */
    specialites.map((specialite, i) => {
      data_1[6][specialite.name] =
        data_1[0][specialite.name] === 0
          ? "0.00"
          : (
              (specialite.surfPropreProf +
                Number(surfaceCommunsArray[i]) +
                Number(profNonRepresenteeArray[i])) /
              data_1[0][specialite.name]
            ).toFixed(2);
    });
    data_1[6]["totalAnnuel"] = Math.round(
      specialites.reduce((totalValue, currentValue, i) => {
        return (
          totalValue +
          data_1[6][currentValue.name] * data_1[0][currentValue.name]
        );
      }, 0)
    );

    /* Coef surface Loyers */
    specialites.map((specialite, i) => {
      data_1[7][specialite.name] =
        (data_1[0][specialite.name] === 0
          ? 0
          : ((specialite.surfPropreProf +
              Number(surfaceCommunsArray[i]) +
              Number(profNonRepresenteeArray[i])) /
              data_1[0][specialite.name] /
              pole.surfaceTotale) *
            100
        ).toFixed(2) + "%";
    });
    data_1[7]["totalAnnuel"] = specialites
      .reduce((totalValue, currentValue, i) => {
        return (
          totalValue +
          (data_1[0][currentValue.name] === 0
            ? 0
            : (currentValue.surfPropreProf +
                Number(surfaceCommunsArray[i]) +
                Number(profNonRepresenteeArray[i])) /
              data_1[0][currentValue.name] /
              pole.surfaceTotale) *
            data_1[0][currentValue.name]
        );
      }, 0)
      .toFixed(2);

    /* Coef surface Autres charges */
    specialites.map((specialite, i) => {
      data_1[8][specialite.name] =
        (data_1[0][specialite.name] === 0
          ? 0
          : ((specialite.surfPropreProf +
              Number(surfaceCommunsArray[i]) +
              Number(profNonRepresenteeArray[i])) /
              data_1[0][specialite.name] /
              (pole.surfaceTotale - profNonRepresenteeTotal)) *
            100
        ).toFixed(2) + "%";
    });
    data_1[8]["totalAnnuel"] = specialites
      .reduce((totalValue, currentValue, i) => {
        return (
          totalValue +
          (data_1[0][currentValue.name] === 0
            ? 0
            : (currentValue.surfPropreProf +
                Number(surfaceCommunsArray[i]) +
                Number(profNonRepresenteeArray[i])) /
              data_1[0][currentValue.name] /
              (pole.surfaceTotale - profNonRepresenteeTotal)) *
            data_1[0][currentValue.name]
        );
      }, 0)
      .toFixed(2);

    setData_Table_1(data_1);
    calcul_Data_2(data_1);
  };
  const calcul_Data_2 = (table_1, table_2 = data_Table_2) => {
    let data_1 = [...table_1];
    /* Filtre la dernière colonne du tableau qui ne représente pas une charge (Frais de fonctionnement)*/
    let charges = table_2.filter(
      (charge) => charge.name !== "Frais de fonctionnement mensuel"
    );

    /* Calcul des charges pour chaque spécialités */
    const chargesArray = charges.map((charge, i) => {
      return specialites.map((specialite, i) => {
        return calculRepartitionCharge(
          // Nom de la charge
          charge.name,
          // Mode de répartition de la charge
          charge.repartition,
          // Montant mensuel de la charge
          charge.total,
          // Dont fixe
          charge.repartition === "ponderation"
            ? (
                (charge.total / data_1[0]["total"]) *
                ponderation.partFixe
              ).toFixed(2)
            : 0,
          // Nombre total de spécialités au sein du pôle
          data_1[0]["total"],
          // Honoraires annuels pour chaque spécialité
          data_1[1][specialite.name],
          // Honoraires annuels de l'ensemble des spécialités
          data_1[1]["total"],
          // Coef surface loyer
          specialite.nombre === 0
            ? 0
            : data_1[7][specialite.name].split("%")[0] / 100,
          // Coef surface charges
          specialite.nombre === 0
            ? 0
            : data_1[8][specialite.name].split("%")[0] / 100,
          //Ponderation
          ponderation
        );
      });
    });

    /* Affichage des charges pour chaque spécialités */
    charges.map((charge, k) => {
      specialites.map((specialite, i) => {
        charge[specialite.name] = Number(chargesArray[k][i]);
      });
    });

    /* Affichage des totaux annuel pour chaque charge */
    charges.map((charge, k) => {
      charge["totalAnnuel"] = Math.round(
        chargesArray[k].reduce((totalValue, currentValue, i) => {
          return (
            Number(totalValue) + Number(currentValue) * specialites[i].nombre
          );
        }, 0) * 12
      );
    });

    /* Calcul des frais fixes pour chaque charge */
    charges.map((charge) => {
      charge["fixe"] = Number(
        charge.repartitionName === "Pondération"
          ? ((charge.total / data_1[0]["total"]) * 2).toFixed(2)
          : 0
      );
    });

    /* Si analyse d'un praticien */
    if (userSelected) {
      charges.map((charge) => {
        const chargeUserExist = userSelected.declaration.charges.find(
          (chargeExist) => chargeExist.name === charge.name
        );
        if (chargeUserExist) {
          if (!charge[userSelected.lastname]) {
            charge[userSelected.lastname] = Number(chargeUserExist.total);
          }
        } else {
          if (!charge[userSelected.lastname]) {
            charge[userSelected.lastname] = "Non renseigné";
          }
        }
        if (typeof charge[userSelected.lastname] !== "string") {
          const result = (
            charge[userSelected.specialite] - charge[userSelected.lastname]
          ).toFixed(2);
          charge["analyse"] = result > 0 ? `+${result}` : result;
        } else {
          if (charge[userSelected.lastname] === "0") {
            const result = (charge[userSelected.specialite] - 0).toFixed(2);
            charge["analyse"] = result > 0 ? `+${result}` : result;
          } else {
            charge["analyse"] = "";
          }
        }
      });
    }

    /* Frais de fonctionnement */
    const fraisFonct = {
      name: "Frais de fonctionnement mensuel",
    };
    fraisFonct["total"] = Number(
      Math.round(
        charges.reduce((totalValue, currentValue) => {
          return Number(totalValue) + Number(currentValue.total);
        }, 0)
      )
    );
    specialites.map((specialite, i) => {
      fraisFonct[specialite.name] = charges
        .reduce((totalValue, currentValue) => {
          return Number(totalValue) + Number(currentValue[specialite.name]);
        }, 0)
        .toFixed(2);
    });
    fraisFonct["totalAnnuel"] = Math.round(
      charges.reduce((totalValue, currentValue, i) => {
        return Number(totalValue) + Number(currentValue.totalAnnuel);
      }, 0)
    );

    /* Si analyse d'un praticien */
    if (userSelected) {
      fraisFonct[userSelected.lastname] = charges
        .reduce((totalValue, currentValue) => {
          return (
            Number(totalValue) +
            (typeof currentValue[userSelected.lastname] !== "string"
              ? Number(currentValue[userSelected.lastname])
              : 0)
          );
        }, 0)
        .toFixed(2);
      const resultAnalyse = charges
        .reduce((totalValue, currentValue) => {
          return (
            Number(totalValue) +
            (currentValue.analyse ? Number(currentValue.analyse) : 0)
          );
        }, 0)
        .toFixed(2);
      fraisFonct["analyse"] =
        resultAnalyse > 0 ? `+${resultAnalyse}` : resultAnalyse;
    }

    let data_2 = [...charges, fraisFonct];
    setData_Table_2(data_2);

    calcul_Data_3(
      data_1,
      data_2,
      data_Table_3[1]["repartition"],
      data_Table_3[3]["repartition"],
      data_Table_3[6]["repartition"]
    );
  };
  const calcul_Data_3 = (
    table_1,
    table_2,
    repartitionSalaire,
    repartitionTaxeSalaires,
    repartitionSisa,
    table_3 = data_Table_3
  ) => {
    let data_1 = [...table_1];
    let data_2 = table_2.filter(
      (data) => data.name !== "Frais de fonctionnement mensuel"
    );
    let data_3 = [...table_3];

    /* Nombre salariés en ETP */
    specialites.map((specialite, i) => {
      if (!data_3[0][specialite.name]) {
        data_3[0][specialite.name] = specialite.numbSalariesETP;
      }
    });
    data_3[0]["total"] = (
      specialites.reduce((totalValue, currentValue, i) => {
        return (
          totalValue +
          data_3[0][currentValue.name] * data_1[0][currentValue.name]
        );
      }, 0) / 35
    ).toFixed(2);
    data_3[0]["repartitionName"] =
      Math.round(
        (specialites.reduce((totalValue, currentValue, i) => {
          return (
            totalValue +
            data_3[0][currentValue.name] * data_1[0][currentValue.name]
          );
        }, 0) /
          35) *
          35
      ) + " heures / semaine à répartir";
    data_3[0]["totalAnnuel"] = Math.round(
      specialites.reduce((totalValue, currentValue, i) => {
        return (
          totalValue +
          data_3[0][currentValue.name] * data_1[0][currentValue.name]
        );
      }, 0) * 52
    );

    /* Salaire brut */
    const salairesBrut = specialites.map((specialite, i) => {
      return calculRepartitionSalaire(
        // Total nombre salariés en ETP (B31)
        data_3[1]["total"],
        // Mode de répartition des salaires
        repartitionSalaire,
        // Nombre total de spécialités
        data_1[0]["total"],
        // Fixe salaire brut
        repartitionSalaire === "ponderation"
          ? (
              (data_3[1]["total"] / data_1[0]["total"]) *
              ponderation.partFixe
            ).toFixed(2)
          : null,
        // Recettes annuelles par spécialité
        data_1[1][specialite.name],
        // Total recettes annuelles
        data_1[1]["total"],
        // Nombre salariés en ETP par spécialité (D31:J31)
        data_3[0][specialite.name],
        // Total annuel nombre d'heures salariés en ETP (K31)
        specialites.reduce((totalValue, currentValue, i) => {
          return (
            totalValue +
            Number(data_3[0][currentValue.name]) *
              Number(data_1[0][currentValue.name]) *
              52
          );
        }, 0),
        // Coef surface charges
        specialite.nombre === 0
          ? 0
          : data_1[8][specialite.name].split("%")[0] / 100,
        //Ponderation
        ponderation
      );
    });
    data_3[1]["total"] = Math.round(salaireBrut * data_3[0]["total"]);
    specialites.map((specialite, i) => {
      data_3[1][specialite.name] = salairesBrut[i];
    });
    data_3[1]["totalAnnuel"] = Math.round(
      specialites.reduce((totalValue, currentValue, i) => {
        return totalValue + salairesBrut[i] * currentValue.nombre;
      }, 0) * 12
    );
    data_3[1]["fixe"] =
      repartitionSalaire === "ponderation"
        ? ((data_3[3]["total"] / data_1[0]["total"]) * 2).toFixed(2)
        : "";

    /* Charges patronales */
    data_3[2]["total"] = Math.round(
      (tranches.chargesSociales / 100) * data_3[1]["total"]
    );
    specialites.map((specialite, i) => {
      data_3[2][specialite.name] = Number(
        salairesBrut[i] * (tranches.chargesSociales / 100)
      ).toFixed(2);
    });
    data_3[2]["totalAnnuel"] = Math.round(
      specialites.reduce((totalValue, currentValue, i) => {
        return (
          totalValue +
          salairesBrut[i] *
            (tranches.chargesSociales / 100) *
            currentValue.nombre
        );
      }, 0) * 12
    );

    /* Taxe sur les salaires */
    data_3[3]["total"] = Math.round(tsTempsPlein * (data_3[0]["total"] / 12));
    const taxeSalaireBrut = specialites.map((specialite, i) => {
      return calculRepartitionTaxeSalaire(
        // Total taxe sur salaires
        Math.round(tsTempsPlein * (data_3[0]["total"] / 12)),
        // Mode de répartition de la taxe sur salaires
        repartitionTaxeSalaires,
        // Nombre total de spécialités
        data_1[0]["total"],
        // Fixe taxe sur salaires
        repartitionTaxeSalaires === "ponderation"
          ? (
              (data_3[3]["total"] / data_1[0]["total"]) *
              ponderation.partFixe
            ).toFixed(2)
          : null,
        // Recettes annuelles par spécialité
        data_1[1][specialite.name],
        // Total recettes annuelles
        data_1[1]["total"],
        // Nombre salariés en ETP par spécialité (D31:J31)
        data_3[0][specialite.name],
        // Total annuel nombre d'heures salariés en ETP (K31)
        specialites.reduce((totalValue, currentValue, i) => {
          return (
            totalValue +
            Number(data_3[0][currentValue.name]) *
              Number(data_1[0][currentValue.name]) *
              52
          );
        }, 0),
        // Coef surface charges
        specialite.nombre === 0
          ? 0
          : data_1[8][specialite.name].split("%")[0] / 100,
        //Ponderation
        ponderation
      );
    });

    specialites.map((specialite, i) => {
      data_3[3][specialite.name] = taxeSalaireBrut[i];
    });
    data_3[3]["totalAnnuel"] = Math.round(
      taxeSalaireBrut.reduce((totalValue, currentValue, i) => {
        return totalValue + currentValue * data_1[0][specialites[i].name];
      }, 0) * 12
    );
    (data_3[3]["fixe"] =
      repartitionTaxeSalaires === "ponderation"
        ? (
            (data_3[3]["total"] / data_1[0]["total"]) *
            ponderation.partFixe
          ).toFixed(2)
        : ""),
      /* Coût salarial */
      (data_3[4]["total"] = Math.round(
        Number(data_3[3]["total"]) +
          Number(data_3[1]["total"]) +
          Number(data_3[2]["total"])
      ));
    specialites.map((specialite, i) => {
      data_3[4][specialite.name] =
        Number(salairesBrut[i]) +
          salairesBrut[i] * (tranches.chargesSociales / 100) +
          Number(taxeSalaireBrut[i]) ===
        0
          ? "0.00"
          : Math.round(
              Number(salairesBrut[i]) +
                salairesBrut[i] * (tranches.chargesSociales / 100) +
                Number(taxeSalaireBrut[i])
            );
    });
    data_3[4]["totalAnnuel"] = Math.round(
      specialites.reduce((totalValue, currentValue, i) => {
        return (
          totalValue +
          (Number(salairesBrut[i]) +
            Number(salairesBrut[i] * (tranches.chargesSociales / 100)) +
            Number(taxeSalaireBrut[i])) *
            data_1[0][currentValue.name]
        );
      }, 0) * 12
    );

    /* Refacturation charges SISA */
    const totalRefSisa = data_3[6]["total"];
    const refSisa = specialites.map((specialite, i) => {
      return calculRepartitionRefSisa(
        // Total charges à la SISA
        totalRefSisa,
        // Mode de repartition charges à la SISA
        repartitionSisa,
        // Nombre total de spécialités
        data_1[0]["total"],
        // Fixe SISA
        ((totalRefSisa / data_1[0]["total"]) * ponderation.partFixe).toFixed(2),
        // Recettes annuelles par spécialité
        data_1[1][specialite.name],
        // Total recettes annuelles
        data_1[1]["total"],
        // Nombre salariés en ETP par spécialité (D31:J31)
        data_3[0][specialite.name],
        // Total annuel nombre d'heures salariés en ETP (K31)
        data_3[0]["totalAnnuel"],
        // Coef surface charges
        specialite.nombre === 0
          ? 0
          : data_1[8][specialite.name].split("%")[0] / 100,
        //Ponderation
        ponderation
      );
    });
    specialites.map((specialite, i) => {
      data_3[6][specialite.name] = refSisa[i];
    });
    data_3[6]["totalAnnuel"] = Math.round(
      specialites.reduce((totalValue, currentValue, i) => {
        return totalValue + refSisa[i] * data_1[0][currentValue.name];
      }, 0) * 12
    );
    data_3[6]["fixe"] =
      repartitionSisa === "ponderation"
        ? ((totalRefSisa / data_1[0]["total"]) * 2).toFixed(2)
        : "";

    /* Cout total mensuel net */
    const frais_Fonct = data_2.reduce((totalValue, currentValue, i) => {
      return Number(totalValue) + Number(currentValue.totalAnnuel);
    }, 0);
    data_3[8]["total"] = Math.round(
      data_2.reduce((totalValue, currentValue, i) => {
        return totalValue + Number(currentValue.total);
      }, 0) + Number(data_3[4]["total"])
    );
    specialites.map((specialite, i) => {
      data_3[8][specialite.name] = Math.round(
        data_2.reduce((totalValue, currentValue, k) => {
          return totalValue + currentValue[specialite.name];
        }, 0) +
          Number(salairesBrut[i]) +
          salairesBrut[i] * (tranches.chargesSociales / 100) +
          Number(taxeSalaireBrut[i]) -
          Number(refSisa[i])
      );
    });
    data_3[8]["totalAnnuel"] =
      Math.round(
        specialites.reduce((totalValue, currentValue, i) => {
          return (
            totalValue +
            (Number(salairesBrut[i]) +
              Number(salairesBrut[i] * (tranches.chargesSociales / 100)) +
              Number(taxeSalaireBrut[i])) *
              data_1[0][currentValue.name]
          );
        }, 0) * 12
      ) + frais_Fonct;

    /* Cout total annuel net */
    const totalCout = Math.round(data_3[8]["total"] * 12);
    const totalCoutArray = specialites.map((specialite, i) => {
      return (
        Math.round(
          data_2.reduce((totalValue, currentValue, k) => {
            return totalValue + currentValue[specialite.name];
          }, 0) +
            Number(salairesBrut[i]) +
            salairesBrut[i] * (tranches.chargesSociales / 100) +
            Number(taxeSalaireBrut[i]) -
            Number(refSisa[i])
        ) * 12
      );
    });
    data_3[9]["total"] = totalCout;
    specialites.map((specialite, i) => {
      data_3[9][specialite.name] = totalCoutArray[i];
    });
    data_3[9]["totalAnnuel"] = Math.round(data_3[8]["totalAnnuel"] * 12);

    /* Répartition des charges en % */
    data_3[10]["total"] =
      (
        specialites.reduce((totalValue, currentValue, i) => {
          return (
            totalValue +
            (totalCoutArray[i] / totalCout) * data_1[0][currentValue.name]
          );
        }, 0) * 100
      ).toFixed(2) + " %";
    specialites.map((specialite, i) => {
      data_3[10][specialite.name] =
        ((totalCoutArray[i] / totalCout) * 100).toFixed(2) + " %";
    });

    /* % Charges/Recettes */
    data_3[11]["total"] =
      (
        (totalCout /
          specialites.reduce((totalValue, currentValue, i) => {
            return (
              totalValue +
              data_1[1][currentValue.name] * data_1[0][currentValue.name]
            );
          }, 0)) *
        100
      ).toFixed(2) + " %";
    specialites.map((specialite, i) => {
      data_3[11][specialite.name] =
        ((totalCoutArray[i] / data_1[1][specialite.name]) * 100).toFixed(2) +
        " %";
    });

    /* Résultats */
    data_3[12]["total"] = Math.round(
      specialites.reduce((totalValue, currentValue, i) => {
        return (
          totalValue +
          data_1[1][currentValue.name] * data_1[0][currentValue.name]
        );
      }, 0) - totalCout
    );
    specialites.map((specialite, i) => {
      data_3[12][specialite.name] =
        data_1[1][specialite.name] - totalCoutArray[i];
    });

    setData_Table_3(data_3);
  };

  useEffect(() => {
    calcul_Data_1();
    return () => {};
  }, []);

  return (
    <div>
      {!userSelected ? (
        <Table1 columns={columns_Table_1} data={data_Table_1} />
      ) : null}
      <Table2
        columns={columns_Table_2}
        data={data_Table_2}
        pole={pole}
        userSelected={userSelected}
      />
      {userSelected ? (
        <ChartAnalyse
          pole={pole}
          data_2={data_Table_2}
          userSelected={userSelected}
        />
      ) : null}
      {!userSelected ? (
        <Table3 columns={columns_Table_3} data={data_Table_3} />
      ) : null}
    </div>
  );
}
