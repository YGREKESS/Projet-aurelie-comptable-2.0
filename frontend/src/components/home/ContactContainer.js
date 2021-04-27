import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import ContactForm from "./ContactForm";

export default function Contact(props) {
  return (
    <div className="contact-page">
      <div className="contact-page-header header-page">
        <NavLink to="#" onClick={() => props.history.goBack()}>
          <AiOutlineArrowLeft size={40} />
        </NavLink>
        <h1>Contact</h1>
      </div>
      <ContactForm />
    </div>
  );
}
