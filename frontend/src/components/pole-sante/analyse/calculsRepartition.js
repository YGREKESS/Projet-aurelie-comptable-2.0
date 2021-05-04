const repartitionName = (repartition) => {
  switch (repartition) {
    case "partsEgales":
      return "Parts égales";
    case "surfacePropre":
      return "Surface propre";
    case "bailleur":
      return "100% bailleur";
    case "recettes":
      return "% Recettes";
    case "coefSurface":
      return "Coef. surface";
    case "ponderation":
      return "Pondération";
    case "libre":
      return "Libre";
    case "mg":
      return "100% MG";
    default:
      break;
  }
};

const calculRepartitionSurfaceCommuns = (
  modeRepartition = null,
  surfaceCommuns = null, // Total surfaces communs B7
  surfacePropreProf = null, // Surface propre pour chaque profession D6:J6
  surfacePropreProfTotal = null, // Total surfaces propre profession B6
  recettesAnnuellesPrat = null, // Recettes pour chaque profession D5:J5
  recettesAnnuellesTotal = null, // Total recettes B5
  totalPrat = null, // Total praticiens B4
  nombrePrat = null // Nombre de praticien pour chaque profession D4:J4
) => {
  switch (modeRepartition) {
    case "partsEgales":
      const partEgales = (surfaceCommuns / totalPrat) * nombrePrat;
      return Number(partEgales).toFixed(2);
    case "surfacePropre":
      const surfacePropre =
        (surfacePropreProf / surfacePropreProfTotal) * surfaceCommuns;
      return Number(surfacePropre).toFixed(2);
    case "recettes":
      const recettes =
        ((recettesAnnuellesPrat * nombrePrat) / recettesAnnuellesTotal) *
        surfaceCommuns;
      return Number(recettes).toFixed(2);
    default:
      return "Erreur";
  }
};

const calculRepartitionSurfaceNonRep = (
  repartitionMode = null,
  surfaceCommunsProf = null, // Surface commun pour chaque profession D7:J7
  surfacePropreProf = null, // Surface propre pour chaque profession D6:J6
  surfaceProfNonRep = null, // Total surface profession non représentée B8
  surfaceTotale = null, // Surface totales B9
  recettesAnnuellesPrat = null, // Recettes pour chaque profession D5:J5
  recettesAnnuellesTotal = null, // Total recettes B5
  totalPrat = null, // Total praticiens B4
  nombrePrat = null, // Nombre de praticien pour chaque profession D4:J4
  pratName = null // Nom de la profession D3:J3 (Important pour 100% MG)
) => {
  /*   console.log(
    repartition,
    surfaceCommunsProf,
    surfacePropreProf,
    surfaceProfNonRep,
    surfaceTotale,
    recettesAnnuellesPrat,
    recettesAnnuellesTotal,
    totalPrat,
    nombrePrat,
    pratName
  ); */

  switch (repartitionMode) {
    case "partsEgales":
      const partEgales = (surfaceProfNonRep / totalPrat) * nombrePrat;
      return partEgales.toFixed(2);
    case "surfacePropre":
      const surfacePropre =
        nombrePrat === 0
          ? 0
          : ((surfacePropreProf + Number(surfaceCommunsProf)) /
              (surfaceTotale - surfaceProfNonRep)) *
            surfaceProfNonRep;
      return surfacePropre.toFixed(2);
    case "recettes":
      const recettes =
        ((recettesAnnuellesPrat * nombrePrat) / recettesAnnuellesTotal) *
        surfaceProfNonRep;
      return recettes.toFixed(2);
    case "bailleur":
      return 0;
    case "mg":
      const mg =
        pratName === "Médecin généraliste"
          ? (surfaceProfNonRep * nombrePrat) / nombrePrat
          : 0;
      return mg.toFixed(2);
    default:
      return "Erreur";
  }
};

const calculRepartitionCharge = (
  chargeName, // Nom de la charge (colonne A)
  modeRepartition,
  chargeTotale, // Total charge (colonne B)
  fixe = null, // Charges fixes (colonne L)
  nombrePrat, // Nombre de praticien pour chaque profession D4:J4
  recettesAnnuellesPrat, // Recettes pour chaque profession D5:J5
  recettesAnnuellesTotal, // Total recettes B5
  coefSurfaceL = null, // Coef surface loyer D11:J11
  coefSurfaceC = null, // Coef surface autres charges D12:J12
  ponderation // Pondération
) => {
  /*   console.log(
    chargeName,
    repartition,
    chargeTotale,
    fixe,
    nombrePrat,
    recettesAnnuellesPrat,
    recettesAnnuellesTotal,
    coefSurfaceL,
    coefSurfaceC
  ); */
  switch (modeRepartition) {
    case "partsEgales":
      return Number(chargeTotale / nombrePrat).toFixed(2);
    case "recettes":
      return Number(
        (chargeTotale * recettesAnnuellesPrat) / recettesAnnuellesTotal
      ).toFixed(2);
    case "coefSurface":
      return Number(
        chargeTotale * (chargeName !== "Loyer" ? coefSurfaceC : coefSurfaceL)
      ).toFixed(2);
    case "ponderation":
      const ponde =
        Number(fixe) +
        (chargeTotale - fixe * nombrePrat) *
          (ponderation.coefSurface /
            (Number(ponderation.coefSurface) + Number(ponderation.recettes))) *
          (chargeName !== "Loyer" ? coefSurfaceC : coefSurfaceL) +
        (chargeTotale - fixe * nombrePrat) *
          (ponderation.recettes /
            (Number(ponderation.recettes) + Number(ponderation.coefSurface))) *
          (recettesAnnuellesPrat / recettesAnnuellesTotal);
      return Number(ponde).toFixed(2);
    default:
      break;
  }
};

const calculRepartitionSalaire = (
  totalSalaireBrut = null, // Total salaire brut B32
  modeRepartition,
  totalPrat = null, // Total praticiens B4
  fixe = null, // Charges fixes (colonne L)
  recettesAnnuellesPrat = null, // Recettes pour chaque profession D5:J5
  recettesAnnuellesTotal = null, // Total recettes B5
  nombreHeuresSalarie = null, // Heures salariés pour chaque profession D30:J30
  totalHeuresSalarie = null, // Total annuel heures salariés
  coefSurfaceC = null, // Coef surface autres charges D12:J12
  ponderation // Pondération
) => {
  /*   console.log(
    totalSalaire,
    repartition,
    nombreTotalPrat,
    fixe,
    recettesAnnuellesPrat,
    recettesAnnuellesTotal,
    nombreHeuresSalarie,
    totalHeuresSalarie,
    coefSurfaceC
  ); */
  switch (modeRepartition) {
    case "partsEgales":
      return Number(totalSalaireBrut / totalPrat).toFixed(2);
    case "ponderation":
      const ponde =
        Number(fixe) +
        (totalSalaireBrut - fixe * totalPrat) *
          (ponderation.coefSurface /
            (Number(ponderation.coefSurface) + Number(ponderation.recettes))) *
          coefSurfaceC +
        (totalSalaireBrut - fixe * totalPrat) *
          (ponderation.recettes /
            (Number(ponderation.recettes) + Number(ponderation.coefSurface))) *
          (recettesAnnuellesPrat / recettesAnnuellesTotal);
      return Number(ponde).toFixed(2);
    case "coefSurface":
      return Number(totalSalaireBrut * coefSurfaceC).toFixed(2);
    case "recettes":
      return Number(
        (totalSalaireBrut * recettesAnnuellesPrat) / recettesAnnuellesTotal
      ).toFixed(2);
    case "libre":
      return Number(
        (totalSalaireBrut * nombreHeuresSalarie * 52) / totalHeuresSalarie
      ).toFixed(2);
    default:
      break;
  }
};

const calculRepartitionTaxeSalaire = (
  totalTaxe = null, // Total taxe sur les salaires B34
  modeRepartition,
  totalPrat = null, // Total praticiens B4
  fixe = null, // Charges fixes (colonne L)
  recettesAnnuellesPrat = null, // Recettes pour chaque profession D5:J5
  recettesAnnuellesTotal = null, // Total recettes B5
  nombreHeuresSalarie = null, // Heures salariés pour chaque profession D30:J30
  totalHeuresSalarie = null, // Total annuel heures salariés
  coefSurfaceC = null, // Coef surface autres charges D12:J12
  ponderation // Pondération
) => {
  /*   console.log(
    totalTaxe,
    repartition,
    totalPrat,
    fixe,
    recettesAnnuellesPrat,
    recettesAnnuellesTotal,
    nombreHeuresSalarie,
    totalHeuresSalarie,
    coefSurfaceC
  ); */
  switch (modeRepartition) {
    case "partsEgales":
      return (totalTaxe / totalPrat).toFixed(2);
    case "ponderation":
      const ponde =
        Number(fixe) +
        (totalTaxe - fixe * totalPrat) *
          (ponderation.coefSurface /
            (Number(ponderation.coefSurface) + Number(ponderation.recettes))) *
          coefSurfaceC +
        (totalTaxe - fixe * totalPrat) *
          (ponderation.recettes /
            (Number(ponderation.recettes) + Number(ponderation.coefSurface))) *
          (recettesAnnuellesPrat / recettesAnnuellesTotal);
      return Number(ponde).toFixed(2);
    case "coefSurface":
      return Number(totalTaxe * coefSurfaceC).toFixed(2);
    case "recettes":
      return Number(
        (totalTaxe * recettesAnnuellesPrat) / recettesAnnuellesTotal
      ).toFixed(2);
    case "libre":
      return Number(
        (totalTaxe * nombreHeuresSalarie * 52) / totalHeuresSalarie
      ).toFixed(2);
    default:
      break;
  }
};

const calculRepartitionRefSisa = (
  totalRefSisa = null, // Total refacturation charges SISA B37
  modeRepartition,
  totalPrat = null, // Total praticiens B4
  fixe = null, // Charges fixes (colonne L)
  recettesAnnuellesPrat = null, // Recettes pour chaque profession D5:J5
  recettesAnnuellesTotal = null, // Total recettes B5
  coefSurfaceC = null, // Coef surface autres charges D12:J12
  ponderation // Pondération
) => {
  console.log(
    totalRefSisa,
    modeRepartition,
    totalPrat,
    fixe,
    recettesAnnuellesPrat,
    recettesAnnuellesTotal,
    coefSurfaceC,
    ponderation
  );
  switch (modeRepartition) {
    case "partsEgales":
      return (totalRefSisa / totalPrat).toFixed(2);
    case "ponderation":
      const ponde =
        Number(fixe) +
        (totalRefSisa - Number(fixe) * totalPrat) *
          (ponderation.coefSurface /
            (Number(ponderation.coefSurface) + Number(ponderation.recettes))) *
          coefSurfaceC +
        (totalRefSisa - Number(fixe) * totalPrat) *
          (ponderation.recettes /
            (Number(ponderation.recettes) + Number(ponderation.coefSurface))) *
          (recettesAnnuellesPrat / recettesAnnuellesTotal);

      return Number(ponde).toFixed(2);
    case "coefSurface":
      return Number(totalRefSisa * coefSurfaceC).toFixed(2);
    case "recettes":
      return Number(
        (totalRefSisa * recettesAnnuellesPrat) / recettesAnnuellesTotal
      ).toFixed(2);
    default:
      break;
  }
};
export {
  repartitionName,
  calculRepartitionCharge,
  calculRepartitionSurfaceCommuns,
  calculRepartitionSurfaceNonRep,
  calculRepartitionSalaire,
  calculRepartitionTaxeSalaire,
  calculRepartitionRefSisa,
};
