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

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const mentions = {
      edition: data.edition,
      responsable: data.responsable,
      hebergeur: data.hebergeur,
      cnil: data.cnil,
    };
    dispatch(updateMentions(mentions));
  };
  const { register, handleSubmit, reset, errors } = useForm({});

  useEffect(() => {
    console.log(parties);
    return () => {};
  }, []);
  return (
    <form
      className="form-mentions-legales form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {parties.map((part, i) => (
        <div className="mentions-legales-part" key={i}>
          <h4>{part.title}</h4>
          <textarea
            ref={register()}
            name={part.name}
            rows={10}
            defaultValue={part.content}
          />
        </div>
      ))}
      <div className="form-validate">
        <button>Modifier</button>
      </div>
    </form>
  );
}
