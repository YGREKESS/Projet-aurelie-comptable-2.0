const addMetierReducer = (state = {}, action) => {
  switch (action.type) {
    case "METIER_ADD_REQUEST":
      return { loading: true };
    case "METIER_ADD_SUCCESS":
      return { loading: false, success: true };
    case "METIER_ADD_FAIL":
      return { loading: false, error: action.payload };
    case "METIER_RESET_SUCCESS":
      return {};
    default:
      return state;
  }
};

const deleteMetierReducer = (state = {}, action) => {
  switch (action.type) {
    case "METIER_DELETE_REQUEST":
      return { loading: true };
    case "METIER_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "METIER_DELETE_FAIL":
      return { loading: false, error: action.payload };
    case "METIER_RESET_SUCCESS":
      return {};
    default:
      return state;
  }
};

const metiersGetReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "METIERS_GET_REQUEST":
      return { loading: true };
    case "METIERS_GET_SUCCESS":
      return { loading: false, metiers: action.payload };
    case "METIERS_GET_FAIL":
      return { loading: false, error: action.payload };
    case "METIERS_GET_RESET":
      return {};
    default:
      return state;
  }
};

const addTrancheReducer = (state = {}, action) => {
  switch (action.type) {
    case "TRANCHE_ADD_REQUEST":
      return { loading: true };
    case "TRANCHE_ADD_SUCCESS":
      return { loading: false, success: true };
    case "TRANCHE_ADD_FAIL":
      return { loading: false, error: action.payload };
    case "TRANCHE_RESET_SUCCESS":
      return {};
    default:
      return state;
  }
};

const updateTrancheReducer = (state = {}, action) => {
  switch (action.type) {
    case "TRANCHE_UPDATE_REQUEST":
      return { loading: true };
    case "TRANCHE_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "TRANCHE_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "TRANCHE_RESET_SUCCESS":
      return {};
    default:
      return state;
  }
};

const tranchesGetReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "TRANCHES_GET_REQUEST":
      return { loading: true };
    case "TRANCHES_GET_SUCCESS":
      return { loading: false, tranches: action.payload };
    case "TRANCHES_GET_FAIL":
      return { loading: false, error: action.payload };
    case "TRANCHES_GET_RESET":
      return {};
    default:
      return state;
  }
};

const addMentionsReducer = (state = {}, action) => {
  switch (action.type) {
    case "MENTIONS_ADD_REQUEST":
      return { loading: true };
    case "MENTIONS_ADD_SUCCESS":
      return { loading: false, success: true };
    case "MENTIONS_ADD_FAIL":
      return { loading: false, error: action.payload };
    case "MENTIONS_RESET_SUCCESS":
      return {};
    default:
      return state;
  }
};

const updateMentionsReducer = (state = {}, action) => {
  switch (action.type) {
    case "MENTIONS_UPDATE_REQUEST":
      return { loading: true };
    case "MENTIONS_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "MENTIONS_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "MENTIONS_RESET_SUCCESS":
      return {};
    default:
      return state;
  }
};

const mentionsGetReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "MENTIONS_GET_REQUEST":
      return { loading: true };
    case "MENTIONS_GET_SUCCESS":
      return { loading: false, mentions: action.payload };
    case "MENTIONS_GET_FAIL":
      return { loading: false, error: action.payload };
    case "MENTIONS_GET_RESET":
      return {};
    default:
      return state;
  }
};

const downloadFicheReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "DOWNLOAD_FICHE_REQUEST":
      return { loading: true };
    case "DOWNLOAD_FICHE_SUCCESS":
      return { loading: false, success: true };
    case "DOWNLOAD_FICHE_FAIL":
      return { loading: false, error: action.payload };
    case "DOWNLOAD_FICHE_RESET":
      return {};
    default:
      return state;
  }
};

export {
  metiersGetReducer,
  deleteMetierReducer,
  addMetierReducer,
  addTrancheReducer,
  updateTrancheReducer,
  tranchesGetReducer,
  addMentionsReducer,
  updateMentionsReducer,
  mentionsGetReducer,
  downloadFicheReducer,
};
