import axios from "axios";

const addDeclaration = (declaration) => async (dispatch) => {
  dispatch({ type: "DECLARATION_ADD_REQUEST" });
  try {
    const { data } = await axios.post("/api/declarations/add", {
      declaration: declaration,
    });
    dispatch({ type: "DECLARATION_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DECLARATION_ADD_FAIL", payload: error.response.data });
  }
};

const deleteDeclaration = (declarationId) => async (dispatch) => {
  dispatch({ type: "DECLARATION_DELETE_REQUEST" });
  try {
    const { data } = await axios.delete(
      `/api/declarations/delete/${declarationId}`
    );
    dispatch({ type: "DECLARATION_DELETE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DECLARATION_DELETE_FAIL", payload: error.response.data });
  }
};

const markAsSeen = (declarationId) => async (dispatch) => {
  dispatch({ type: "DECLARATION_MARK_AS_SEEN_REQUEST" });
  try {
    const { data } = await axios.put(`/api/declarations/seen/${declarationId}`);
    dispatch({ type: "DECLARATION_MARK_AS_SEEN_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DECLARATION_MARK_AS_SEEN_FAIL",
      payload: error.response.data,
    });
  }
};

const getAllDeclarations = (id) => async (dispatch) => {
  dispatch({ type: "DECLARATIONS_GET_REQUEST" });
  try {
    const { data } = await axios.get(`/api/declarations/all/${id}`);
    dispatch({ type: "DECLARATIONS_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DECLARATIONS_GET_FAIL", payload: error.response.data });
  }
};

const getOneDeclaration = (declarationId) => async (dispatch) => {
  dispatch({ type: "DECLARATION_GET_REQUEST" });
  try {
    const { data } = await axios.get(`/api/declarations/${declarationId}`);
    dispatch({ type: "DECLARATION_GET_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DECLARATION_GET_FAIL", payload: error.response.data });
  }
};

const resetDeclarationSelected = () => async (dispatch) => {
  dispatch({ type: "DECLARATION_SELECTED_RESET_REQUEST" });
};

const updateDeclaration = (declarationId, declaration) => async (dispatch) => {
  dispatch({ type: "DECLARATION_UPDATE_REQUEST" });
  try {
    const { data } = await axios.put(
      `/api/declarations/${declarationId}`,
      declaration
    );
    dispatch({ type: "DECLARATION_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DECLARATION_UPDATE_FAIL", payload: error.response.data });
  }
};

const resetSuccessDeclaration = () => (dispatch) => {
  dispatch({ type: "DECLARATION_UPDATE_RESET" });
  dispatch({ type: "DECLARATION_ADD_RESET" });
  dispatch({ type: "DECLARATION_DELETE_RESET" });
  dispatch({ type: "DECLARATION_MARK_AS_SEEN_RESET" });
};

const resetPoleDeclarations = () => (dispatch) => {
  dispatch({ type: "DECLARATIONS_GET_RESET" });
};

export {
  addDeclaration,
  deleteDeclaration,
  resetPoleDeclarations,
  markAsSeen,
  getAllDeclarations,
  getOneDeclaration,
  updateDeclaration,
  resetSuccessDeclaration,
  resetDeclarationSelected,
};
