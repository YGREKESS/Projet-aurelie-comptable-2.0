import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPraticiens } from "../../../2-actions/poleActions";
import LoadingSpinner from "../../LoadingSpinner";
import TableListePraticiens from "./TableListePraticiens";

export default function PolePraticiens() {
  const { id } = useParams();

  const polePraticiens = useSelector((state) => state.polePraticiens);
  const { loading, praticiens, error } = polePraticiens;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPraticiens(id));
    return () => {};
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <p style={{ width: "100%", marginBottom: "2rem" }}>
          Liste des praticiens du pôle.
        </p>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        ""
      ) : (
        <TableListePraticiens praticiens={praticiens} />
      )}
    </>
  );
}
