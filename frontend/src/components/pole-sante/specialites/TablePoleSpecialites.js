import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { formatDate } from "../../../utils";
import ModalSpecialiteUpdate from "./ModalSpecialiteUpdate";
import ModalSpecialiteDelete from "./ModalSpecialiteDelete";

export default function TablePoleSpecialites({ specialites, pole, metiers }) {
  return (
    <MaterialTable
      title=""
      columns={[
        { title: "Spécialité", field: "name" },
        {
          title: "Nombre",
          field: "nombre",
        },
        {
          title: "Honoraires (€)",
          field: "honoraires",
          render: (rowData) => rowData.honoraires + " €",
        },
        {
          title: "",
          field: "",
          render: (rowData) => (
            <div style={{ display: "flex" }}>
              <ModalSpecialiteUpdate item={rowData} metiers={metiers} />
              <ModalSpecialiteDelete item={rowData} />
            </div>
          ),
        },
      ]}
      data={specialites}
      options={{
        exportButton: false,
        toolbar: false,
        search: false,
        pageSize: 10,
        headerStyle: {
          backgroundColor: "#18212D",
          fontSize: "18px",
          color: "#FFF",
        },
      }}
      localization={{
        body: {
          emptyDataSourceMessage: "Pas de spécialité à afficher",
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
        width: "100%",
        height: "100%",
        boxShadow: "none",
      }}
    />
  );
}
