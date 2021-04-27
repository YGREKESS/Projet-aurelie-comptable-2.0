import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { formatDate } from "../../../utils";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ModalPraticienDeclaration from "./ModalPraticienDeclaration";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDeclarations,
  resetSuccessDeclaration,
} from "../../../2-actions/declarationActions";
import { useParams } from "react-router";
import LoadingSpinner from "../../LoadingSpinner";

export default function TablePraticienInfos({ praticien }) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const allDeclarationsGet = useSelector((state) => state.allDeclarationsGet);
  const { loading, declarations, error } = allDeclarationsGet;

  const declarationMarkAsSeen = useSelector(
    (state) => state.declarationMarkAsSeen
  );
  const { loading: loadingMark, success } = declarationMarkAsSeen;

  useEffect(() => {
    if (success) {
      dispatch(getAllDeclarations(id));
      dispatch(resetSuccessDeclaration());
    }
    return () => {};
  }, [success]);
  return loading || loadingMark ? (
    <LoadingSpinner />
  ) : declarations ? (
    <MaterialTable
      title={""}
      columns={[
        {
          title: "Déclaration",
          field: "name",
          render: (rowData) =>
            rowData.name
              ? rowData.name
              : "Déclaration du " + formatDate(rowData.date),
        },
        {
          title: "Date",
          field: "date",
          defaultSort: "desc",
          render: (rowData) => formatDate(rowData.date),
        },
        {
          render: (rowData) =>
            rowData.seen === false ? (
              <NotificationsIcon style={{ color: "red" }} />
            ) : (
              ""
            ),
        },
        {
          title: "",
          field: "",
          render: (rowData) => (
            <ModalPraticienDeclaration
              praticien={praticien}
              declaration={rowData}
            />
          ),
        },
      ]}
      data={declarations.filter(
        (declaration) => declaration.user === praticien._id
      )}
      options={{
        exportButton: false,
        toolbar: false,
        search: false,
        pageSize: 10,
        minBodyHeight: "20rem",
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
        width: "100%",
        height: "50%",
        boxShadow: "none",
      }}
    />
  ) : null;
}
