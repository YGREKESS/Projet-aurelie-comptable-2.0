import React, { useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getMentions } from "../../2-actions/DonneeGlobaleActions";
import MentionsContent from "./MentionsContent";

export default function MentionsLegales(props) {
  const mentionsGet = useSelector((state) => state.mentionsGet);
  const { loading, mentions, error } = mentionsGet;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMentions());
    return () => {};
  }, []);

  return (
    <div className="mentions-legales">
      <div className="mentions-legales-header header-page">
        <NavLink to={"#"} onClick={() => props.history.goBack()}>
          <AiOutlineArrowLeft size={40} />
        </NavLink>
        <h1>Mentions légales</h1>
      </div>
      {mentions ? <MentionsContent mentions={mentions[0]} /> : null}
    </div>
  );
}
