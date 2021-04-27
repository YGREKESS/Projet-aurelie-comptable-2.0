import React, { useEffect, useState } from "react";
import "../../1-css/Home.css";
import HomeFormDeclaration from "./HomeFormDeclaration";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { useSelector } from "react-redux";
import ReactModal from "react-modal";

export default function HomeDeclaration() {
  const [modal, setModal] = useState(false);

  const declarationAdd = useSelector((state) => state.declarationAdd);
  const { loading, success, error } = declarationAdd;

  useEffect(() => {
    if (success) {
      setModal(true);
    }
    return () => {};
  }, [success]);

  return (
    <>
      <ReactModal
        isOpen={modal}
        className="modal-home-form modal"
        ariaHideApp={false}
        overlayClassName="overlay-home-form overlay"
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <AiOutlineCheckSquare size={80} />
        <p>Votre déclaration a été envoyée avec succès !</p>
      </ReactModal>
      <div className={"home-declaration page"}>
        <HomeFormDeclaration />
      </div>
    </>
  );
}
