const poleAddReducer = (state = {}, action) => {
  switch (action.type) {
    case "POLE_ADD_REQUEST":
      return { loading: true };
    case "POLE_ADD_SUCCESS":
      return { loading: false, success: true };
    case "POLE_ADD_FAIL":
      return { loading: false, error: action.payload };
    case "POLE_ADD_RESET":
      return {};
    default:
      return state;
  }
};

const poleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "POLE_DELETE_REQUEST":
      return { loading: true };
    case "POLE_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "POLE_DELETE_FAIL":
      return { loading: false, error: action.payload };
    case "POLE_DELETE_RESET":
      return {};
    default:
      return state;
  }
};

const allPolesGetReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "POLES_GET_REQUEST":
      return { loading: true };
    case "POLES_GET_SUCCESS":
      return { loading: false, poles: action.payload };
    case "POLES_GET_FAIL":
      return { loading: false, error: action.payload };
    case "POLES_GET_RESET":
      return {};
    default:
      return state;
  }
};

const onePoleGetReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "POLE_GET_REQUEST":
      return { loading: true };
    case "POLE_GET_SUCCESS":
      return { loading: false, pole: action.payload };
    case "POLE_GET_FAIL":
      return { loading: false, error: action.payload };
    case "POLE_GET_RESET":
      return {};
    default:
      return state;
  }
};

const polePraticiensGetReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "POLE_GET_PRATICIENS_REQUEST":
      return { loading: true };
    case "POLE_GET_PRATICIENS_SUCCESS":
      return { loading: false, praticiens: action.payload };
    case "POLE_GET_PRATICIENS_FAIL":
      return { loading: false, error: action.payload };
    case "POLE_GET_PRATICIENS_RESET":
      return {};
    default:
      return state;
  }
};

const poleUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "POLE_UPDATE_REQUEST":
      return { loading: true };
    case "POLE_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "POLE_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "POLE_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};

export {
  poleAddReducer,
  poleDeleteReducer,
  allPolesGetReducer,
  onePoleGetReducer,
  poleUpdateReducer,
  polePraticiensGetReducer,
};
