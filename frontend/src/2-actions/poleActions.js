import axios from "axios";

const getAllPole = () => async (dispatch) => {
  dispatch({ type: "POLES_GET_REQUEST" });
  try {
    const { data } = await axios.get("/api/poles/");
    dispatch({ type: "POLES_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "POLES_GET_FAIL", payload: error.response.data });
  }
};

const getOnePole = (poleId) => async (dispatch) => {
  dispatch({ type: "POLE_GET_REQUEST" });
  try {
    const { data } = await axios.get(`/api/poles/${poleId}`);

    dispatch({ type: "POLE_GET_SUCCESS", payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: "POLE_GET_FAIL", payload: error.response.data });
  }
};

const getPraticiens = (poleId) => async (dispatch) => {
  dispatch({ type: "POLE_GET_PRATICIENS_REQUEST" });
  try {
    const { data } = await axios.get(`/api/poles/${poleId}/praticiens`);
    dispatch({ type: "POLE_GET_PRATICIENS_SUCCESS", payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: "POLE_GET_PRATICIENS_FAIL",
      payload: error.response.data,
    });
  }
};

const addPole = (pole) => async (dispatch) => {
  dispatch({ type: "POLE_ADD_REQUEST" });
  try {
    const { data } = await axios.post("/api/poles/ajouter", pole);
    dispatch({ type: "POLE_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "POLE_ADD_FAIL", payload: error.response.data });
  }
};

const deletePole = (poleId) => async (dispatch) => {
  dispatch({ type: "POLE_DELETE_REQUEST" });
  try {
    const { data } = await axios.delete(`/api/poles/${poleId}`);
    dispatch({ type: "POLE_DELETE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "POLE_DELETE_FAIL", payload: error.response.data });
  }
};

const updatePole = (poleId, pole) => async (dispatch) => {
  dispatch({ type: "POLE_UPDATE_REQUEST" });
  try {
    const { data } = await axios.put(`/api/poles/update/${poleId}`, pole);
    dispatch({ type: "POLE_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "POLE_UPDATE_FAIL", payload: error.response.data });
  }
};

const resetSuccessPole = () => async (dispatch) => {
  dispatch({ type: "POLE_UPDATE_RESET" });
  dispatch({ type: "POLE_DELETE_RESET" });
  dispatch({ type: "POLE_ADD_RESET" });
};

export {
  getAllPole,
  getOnePole,
  addPole,
  updatePole,
  deletePole,
  resetSuccessPole,
  getPraticiens,
};
