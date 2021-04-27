const userInfosReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "USER_INFOS_REQUEST":
      return { loading: true };
    case "USER_INFOS_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_INFOS_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_DELETE_REQUEST":
      return { loading: true };
    case "USER_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "USER_DELETE_FAIL":
      return { loading: false, error: action.payload };
    case "USER_DELETE_RESET":
      return {};
    default:
      return state;
  }
};

const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_CREATE_REQUEST":
      return { loading: true };
    case "USER_CREATE_SUCCESS":
      return { loading: false, success: true };
    case "USER_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "USER_CREATE_RESET":
      return {};
    default:
      return state;
  }
};

const userSendEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_SEND_EMAIL_REQUEST":
      return { loading: true };
    case "USER_SEND_EMAIL_SUCCESS":
      return { loading: false, success: true };
    case "USER_SEND_EMAIL_FAIL":
      return { loading: false, error: action.payload };
    case "USER_SEND_EMAIL_RESET":
      return {};
    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, success: true };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATEPASSWORD_REQUEST":
      return { loading: true };
    case "USER_UPDATEPASSWORD_SUCCESS":
      return { loading: false, success: true };
    case "USER_UPDATEPASSWORD_FAIL":
      return { loading: false, error: action.payload };
    case "USER_UPDATEPASSWORD_RESET":
      return {};
    default:
      return state;
  }
};

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return { loading: true };
    case "USER_UPDATE_SUCCESS":
      return {
        loading: false,
        success: true,
        userUpdate: action.payload.userUpdate,
      };
    case "USER_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "USER_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};

const userDeclarationsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "GET_USER_DECLARATIONS_REQUEST":
      return { loading: true };
    case "GET_USER_DECLARATIONS_SUCCESS":
      return { loading: false, declarations: action.payload };
    case "GET_USER_DECLARATIONS_FAIL":
      return { loading: false, error: action.payload };
    case "GET_USER_DECLARATIONS_RESET":
      return {};
    default:
      return state;
  }
};

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, success: true, userLoginInfos: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export {
  userInfosReducer,
  userRegisterReducer,
  userDeleteReducer,
  userLoginReducer,
  userUpdateReducer,
  userCreateReducer,
  userUpdatePasswordReducer,
  userDeclarationsReducer,
  userSendEmailReducer,
};
