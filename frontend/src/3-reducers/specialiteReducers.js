const specialiteAddReducer = (state = {}, action) => {
  switch (action.type) {
    case "SPECIALITE_ADD_REQUEST":
      return { loading: true };
    case "SPECIALITE_ADD_SUCCESS":
      return { loading: false, success: true };
    case "SPECIALITE_ADD_FAIL":
      return { loading: false, error: action.payload };
    case "SPECIALITE_ADD_RESET":
      return {};
    default:
      return state;
  }
};

const deleteSpecialiteReducer = (state = {}, action) => {
  switch (action.type) {
    case "SPECIALITE_DELETE_REQUEST":
      return { loading: true };
    case "SPECIALITE_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "SPECIALITE_DELETE_FAIL":
      return { loading: false, error: action.payload };
    case "SPECIALITE_DELETE_RESET":
      return {};
    default:
      return state;
  }
};

const allSpecialitesGetReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "SPECIALITES_GET_REQUEST":
      return { loading: true };
    case "SPECIALITES_GET_SUCCESS":
      return { loading: false, specialites: action.payload };
    case "SPECIALITES_GET_FAIL":
      return { loading: false, error: action.payload };
    case "SPECIALITES_GET_RESET":
      return {};
    default:
      return state;
  }
};

const oneSpecialitesGetReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "SPECIALITE_GET_REQUEST":
      return { loading: true };
    case "SPECIALITE_GET_SUCCESS":
      return { loading: false, specialite: action.payload };
    case "SPECIALITE_GET_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const specialiteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "SPECIALITE_UPDATE_REQUEST":
      return { loading: true };
    case "SPECIALITE_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "SPECIALITE_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "SPECIALITE_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};

export {
  specialiteAddReducer,
  allSpecialitesGetReducer,
  oneSpecialitesGetReducer,
  deleteSpecialiteReducer,
  specialiteUpdateReducer,
};
