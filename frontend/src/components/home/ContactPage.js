import React from "react";
import Content from "../Content";
import Header from "../Header";

export default function Contact() {
  const appBar = {
    title: "Contact",
    links: [
      {
        id: "/mon-espace/Contact/",
        name: "Formulaire de contact",
      },
    ],
  };

  return (
    <div className="contact-page page">
      <Header appBar={appBar} />
      <Content />
    </div>
  );
}
