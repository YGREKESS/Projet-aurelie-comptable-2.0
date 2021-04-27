import axios from "axios";

const getAllUsers = (token) => async (dispatch) => {
  dispatch({ type: "GET_ALL_USERS_REQUEST" });
  try {
    const { data } = await axios.get("/api/users/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_USERS_FAIL", payload: error.response.data });
  }
};

export { getAllUsers };
