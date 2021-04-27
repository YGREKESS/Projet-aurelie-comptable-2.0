import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { downloadFiche } from "../../2-actions/DonneeGlobaleActions";
import DescriptionIcon from "@material-ui/icons/Description";

export default function FicheRegistre() {
  const ficheDownload = useSelector((state) => state.ficheDownload);
  const { loading, success, error } = ficheDownload;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      console.log("Success");
    }
    return () => {};
  }, [success]);

  return (
    <div className="fiche-registre">
      <div className="fiche-registre-icon">
        <DescriptionIcon style={{ fontSize: 60, color: "#18212d" }} />
        <h4>Fiche de registre</h4>
        <button onClick={() => dispatch(downloadFiche())}>Télécharger</button>
      </div>
    </div>
  );
}
