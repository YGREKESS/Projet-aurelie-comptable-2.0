import axios from "axios";

const getMetiers = () => async (dispatch) => {
  dispatch({ type: "METIERS_GET_REQUEST" });
  try {
    const { data } = await axios.get("/api/donnees-globales/metiers/");
    dispatch({ type: "METIERS_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "METIERS_GET_FAIL", payload: error.response.data });
  }
};

const addMetier = (metier) => async (dispatch) => {
  dispatch({ type: "METIER_ADD_REQUEST" });
  try {
    const { data } = await axios.post("/api/donnees-globales/metiers/", metier);
    dispatch({ type: "METIER_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "METIER_ADD_FAIL", payload: error.response.data });
  }
};

const deleteMetier = (metierId) => async (dispatch) => {
  dispatch({ type: "METIER_DELETE_REQUEST" });
  try {
    const { data } = await axios.delete(
      `/api/donnees-globales/metiers/${metierId}`
    );
    dispatch({ type: "METIER_DELETE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "METIER_DELETE_FAIL", payload: error.response.data });
  }
};

const getTranches = () => async (dispatch) => {
  dispatch({ type: "TRANCHES_GET_REQUEST" });
  try {
    const { data } = await axios.get("/api/donnees-globales/tranches/");
    dispatch({ type: "TRANCHES_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "TRANCHES_GET_FAIL", payload: error.response.data });
  }
};

const addTranche = (tranche) => async (dispatch) => {
  dispatch({ type: "TRANCHE_ADD_REQUEST" });
  try {
    const { data } = await axios.post(
      "/api/donnees-globales/tranches/",
      tranche
    );
    dispatch({ type: "TRANCHE_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "TRANCHE_ADD_FAIL", payload: error.response.data });
  }
};

const updateTranche = (tranche) => async (dispatch) => {
  dispatch({ type: "TRANCHE_UPDATE_REQUEST" });
  try {
    const { data } = await axios.put(
      `/api/donnees-globales/tranches/`,
      tranche
    );
    dispatch({ type: "TRANCHE_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "TRANCHE_UPDATE_FAIL", payload: error.response.data });
  }
};

const getMentions = () => async (dispatch) => {
  dispatch({ type: "MENTIONS_GET_REQUEST" });
  try {
    const { data } = await axios.get("/api/donnees-globales/mentions-legales/");
    dispatch({ type: "MENTIONS_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "MENTIONS_GET_FAIL", payload: error.response.data });
  }
};

const addMentions = (mentions) => async (dispatch) => {
  dispatch({ type: "MENTIONS_ADD_REQUEST" });
  try {
    const { data } = await axios.post(
      "/api/donnees-globales/mentions-legales/",
      mentions
    );
    dispatch({ type: "MENTIONS_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "MENTIONS_ADD_FAIL", payload: error.response.data });
  }
};

const updateMentions = (mentions) => async (dispatch) => {
  dispatch({ type: "MENTIONS_UPDATE_REQUEST" });
  try {
    const { data } = await axios.put(
      `/api/donnees-globales/mentions-legales/`,
      mentions
    );
    dispatch({ type: "MENTIONS_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "MENTIONS_UPDATE_FAIL", payload: error.response.data });
  }
};

const downloadFiche = () => async (dispatch) => {
  dispatch({ type: "DOWNLOAD_FICHE_REQUEST" });
  try {
    const { data } = await axios.get("/api/donnees-globales/fiche-registre/");
    if (data) {
      window.open(`/api/donnees-globales/fiche-registre/`);
    }
    dispatch({ type: "DOWNLOAD_FICHE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DOWNLOAD_FICHE_FAIL", payload: error.response.data });
  }
};

const resetSuccessMentions = () => (dispatch) => {
  dispatch({ type: "MENTIONS_RESET_SUCCESS" });
};

const resetSuccessTranche = () => (dispatch) => {
  dispatch({ type: "TRANCHE_RESET_SUCCESS" });
};

const resetSuccessMetier = () => (dispatch) => {
  dispatch({ type: "METIER_RESET_SUCCESS" });
};

export {
  getMetiers,
  addMetier,
  deleteMetier,
  resetSuccessMetier,
  getTranches,
  addTranche,
  updateTranche,
  resetSuccessTranche,
  getMentions,
  addMentions,
  updateMentions,
  resetSuccessMentions,
  downloadFiche,
};
