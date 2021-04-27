import React, { useEffect } from "react";
import MaterialTable from "material-table";
import ModalPraticienInfos from "./ModalPraticienInfos";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllDeclarations } from "../../../2-actions/declarationActions";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LoadingSpinner from "../../LoadingSpinner";

export default function TableListePraticiens({ praticiens, pole }) {
  const { id } = useParams();

  const allDeclarationsGet = useSelector((state) => state.allDeclarationsGet);
  const { loading, declarations, error } = allDeclarationsGet;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, [declarations]);

  return (
    <MaterialTable
      title=""
      columns={[
        {
          title: "Nom",
          render: (rowData) => rowData.lastname + " " + rowData.firstname,
        },
        {
          title: "Spécialité",
          field: "specialite",
        },
        {
          render: (rowData) =>
            declarations &&
            declarations
              .filter((declaration) => declaration.user === rowData._id)
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
            <ModalPraticienInfos poleId={id} praticien={rowData} />
          ),
        },
      ]}
      data={praticiens}
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
          emptyDataSourceMessage: "Pas de praticien à afficher",
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
