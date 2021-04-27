import React from "react";
import MaterialTable from "material-table";
import { formatDate } from "../../utils";
import ModalDeclarationUpdate from "./ModalDeclarationUpdate";
import ModalDeclarationDelete from "../pole-sante/declarations/ModalDeclarationDelete";

export default function TableMesDeclarations({ declarations }) {
  return (
    <MaterialTable
      title=""
      columns={[
        { title: "Nom", field: "name" },
        {
          title: "Date",
          field: "date",
          render: (rowData) => formatDate(rowData.date),
          defaultSort: "desc",
        },
        {
          title: "",
          field: "",
          render: (rowData) => (
            <div style={{ display: "flex" }}>
              <ModalDeclarationUpdate item={rowData} />
              <ModalDeclarationDelete item={rowData} />
            </div>
          ),
        },
      ]}
      data={declarations}
      options={{
        exportButton: false,
        pageSize: 10,
        headerStyle: {
          backgroundColor: "#18212D",
          fontSize: "18px",
          color: "#FFF",
        },
      }}
      localization={{
        body: {
          emptyDataSourceMessage: "Pas de déclaration à afficher",
          addTooltip: "Ajouter",
          deleteTooltip: "Supprimer",
          editTooltip: "Editer",
          filterRow: {
            filterTooltip: "Filtrer",
          },
          editRow: {
            deleteText: "Voulez-vous supprimer cette ligne?",
            cancelTooltip: "Annuler",
            saveTooltip: "Enregistrer",
          },
        },
        grouping: {
          placeholder: "Tirer l'entête ...",
          groupedBy: "Grouper par:",
        },
        header: {
          actions: "Actions",
        },
        pagination: {
          labelDisplayedRows: "{from}-{to} de {count}",
          labelRowsSelect: "lignes",
          labelRowsPerPage: "lignes par page:",
          firstAriaLabel: "Première page",
          firstTooltip: "Première page",
          previousAriaLabel: "Page précédente",
          previousTooltip: "Page précédente",
          nextAriaLabel: "Page suivante",
          nextTooltip: "Page suivante",
          lastAriaLabel: "Dernière page",
          lastTooltip: "Dernière page",
        },
        toolbar: {
          addRemoveColumns: "Ajouter ou supprimer des colonnes",
          nRowsSelected: "{0} ligne(s) sélectionée(s)",
          showColumnsTitle: "Voir les colonnes",
          showColumnsAriaLabel: "Voir les colonnes",
          exportTitle: "Exporter",
          exportAriaLabel: "Exporter",
          exportName: "Exporter en CSV",
          searchTooltip: "Chercher",
          searchPlaceholder: "Chercher",
        },
      }}
      style={{
        height: "100%",
        width: "100%",
        boxShadow: "none",
      }}
    />
  );
}
