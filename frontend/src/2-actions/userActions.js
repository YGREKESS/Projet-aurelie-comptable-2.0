import axios from "axios";
import Cookie from "js-cookie";

const getInfos = (userId) => async (dispatch) => {
  dispatch({ type: "USER_INFOS_REQUEST" });
  try {
    const { data } = await axios.get(`/api/users/get-infos/${userId}`);
    dispatch({ type: "USER_INFOS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_INFOS_FAIL", payload: error.response.data });
  }
};

const createUser = (user, token) => async (dispatch) => {
  dispatch({ type: "USER_CREATE_REQUEST" });
  try {
    const { data } = await axios.post(`/api/users/create-user`, user, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: "USER_CREATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_CREATE_FAIL", payload: error.response.data });
  }
};

const deleteUser = (userId, token) => async (dispatch) => {
  dispatch({ type: "USER_DELETE_REQUEST" });
  try {
    const { data } = await axios.delete(`/api/users/delete-user/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: "USER_DELETE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_DELETE_FAIL", payload: error.response.data });
  }
};

const getUserDeclarations = (id) => async (dispatch) => {
  dispatch({ type: "GET_USER_DECLARATIONS_REQUEST" });
  try {
    const { data } = await axios.get(`/api/users/declarations/${id}`);
    dispatch({ type: "GET_USER_DECLARATIONS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_USER_DECLARATIONS_FAIL",
      payload: error.response.data,
    });
  }
};

const updateInfos = (user, token) => async (dispatch) => {
  dispatch({ type: "USER_UPDATE_REQUEST" });
  try {
    const { data } = await axios.put(
      "/api/users/update-user",
      { user },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: "USER_UPDATE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "USER_UPDATE_FAIL", payload: error.response.data });
  }
};

const updatePassword = (password) => async (dispatch) => {
  dispatch({ type: "USER_UPDATEPASSWORD_REQUEST" });
  try {
    const { data } = await axios.put("/api/users/update-password", {
      password,
    });
    dispatch({ type: "USER_UPDATEPASSWORD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_UPDATEPASSWORD_FAIL",
      payload: error.response.data,
    });
  }
};

const register = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const { data } = await axios.post("/api/auth/register", user);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
    dispatch(login(data.email, user.password));
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAIL", payload: error.response.data });
  }
};

const login = (email, password) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const { data } = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    Cookie.set("userInfos", {
      _id: data._id,
      lastname: data.lastname,
      firstname: data.firstname,
      email: data.email,
      token: data.token,
    });
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data });
  }
};

const sendEmail = (user, subject, message = null, to, email = null) => async (
  dispatch
) => {
  dispatch({ type: "USER_SEND_EMAIL_REQUEST" });
  try {
    const { data } = await axios.post("/api/users/send-email", {
      user: user,
      subject: subject,
      to: to,
      message: message,
      email: email,
    });
    dispatch({ type: "USER_SEND_EMAIL_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "USER_SEND_EMAIL_FAIL",
      payload: error.response.data,
    });
  }
};

const userSuccessReset = () => (dispatch) => {
  dispatch({ type: "USER_UPDATE_RESET" });
  dispatch({ type: "USER_UPDATEPASSWORD_RESET" });
  dispatch({ type: "USER_DELETE_RESET" });
  dispatch({ type: "USER_HOME_FORM_REGISTER_RESET" });
  dispatch({ type: "USER_SEND_EMAIL_RESET" });
  dispatch({ type: "USER_CREATE_RESET" });
};

const logout = () => async (dispatch) => {
  dispatch({ type: "USER_LOGOUT" });
  dispatch({ type: "DECLARATIONS_GET_RESET" });
  dispatch({ type: "GET_USER_DECLARATIONS_RESET" });
  dispatch({ type: "POLES_GET_RESET" });
  dispatch({ type: "POLE_GET_RESET" });
  dispatch({ type: "POLE_GET_PRATICIENS_RESET" });
  dispatch({ type: "METIERS_GET_RESET" });
  Cookie.remove("userInfos");
};
export {
  register,
  login,
  logout,
  deleteUser,
  getInfos,
  updateInfos,
  userSuccessReset,
  updatePassword,
  getUserDeclarations,
  sendEmail,
  createUser,
};
