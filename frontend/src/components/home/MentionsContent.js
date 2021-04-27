import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateMentions } from "../../2-actions/DonneeGlobaleActions";

export default function MentionsContent({ mentions }) {
  const parties = [
    {
      title: "Edition du site",
      content: mentions.edition,
      name: "edition",
    },
    {
      title: "Responsable de publication",
      content: mentions.responsable,
      name: "responsable",
    },
    {
      title: "Hébergeur",
      content: mentions.hebergeur,
      name: "hebergeur",
    },
    {
      title: "CNIL",
      content: mentions.cnil,
      name: "cnil",
    },
  ];

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      {parties.map((part, i) => (
        <div className="mentions-legales-part" key={i}>
          <h4>{part.title}</h4>
          <p>{part.content}</p>
        </div>
      ))}
    </>
  );
}
