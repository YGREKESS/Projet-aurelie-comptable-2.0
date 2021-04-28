import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMentions,
  resetSuccessMentions,
} from "../../2-actions/DonneeGlobaleActions";
import MentionsContent from "./MentionsContent";
import Notifications, { notify } from "react-notify-toast";

export default function MentionLegales() {
  const mentionsUpdate = useSelector((state) => state.mentionsUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = mentionsUpdate;

  const mentionsGet = useSelector((state) => state.mentionsGet);
  const { loading, mentions, error } = mentionsGet;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!mentions) {
      dispatch(getMentions());
    }
    if (successUpdate) {
      notify.show("Les modifications ont été enregistrées !", "success", 3000);
      dispatch(resetSuccessMentions());
      dispatch(getMentions());
    }
    if (errorUpdate) {
      notify.show(errorUpdate, "error", 3000);
      dispatch(resetSuccessMentions());
    }
    return () => {};
  }, [successUpdate, errorUpdate]);
  return (
    <div className="mentions-legales-admin">
      <Notifications />
      {mentions ? <MentionsContent mentions={mentions[0]} /> : null}
    </div>
  );
}
