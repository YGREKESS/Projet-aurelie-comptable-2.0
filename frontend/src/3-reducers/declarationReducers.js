const addDeclarationReducer = (state = {}, action) => {
  switch (action.type) {
    case "DECLARATION_ADD_REQUEST":
      return { loading: true };
    case "DECLARATION_ADD_SUCCESS":
      return { loading: false, success: true };
    case "DECLARATION_ADD_FAIL":
      return { loading: false, error: action.payload };
    case "DECLARATION_ADD_RESET":
      return {};
    default:
      return state;
  }
};

const deleteDeclarationReducer = (state = {}, action) => {
  switch (action.type) {
    case "DECLARATION_DELETE_REQUEST":
      return { loading: true };
    case "DECLARATION_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "DECLARATION_DELETE_FAIL":
      return { loading: false, error: action.payload };
    case "DECLARATION_DELETE_RESET":
      return {};
    default:
      return state;
  }
};

const allDeclarationsGetReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "DECLARATIONS_GET_REQUEST":
      return { loading: true };
    case "DECLARATIONS_GET_SUCCESS":
      return { loading: false, declarations: action.payload };
    case "DECLARATIONS_GET_FAIL":
      return { loading: false, error: action.payload };
    case "DECLARATIONS_GET_RESET":
      return {};
    default:
      return state;
  }
};

const oneDeclarationGetReducer = (state = {}, action) => {
  switch (action.type) {
    case "DECLARATION_GET_REQUEST":
      return { loading: true };
    case "DECLARATION_GET_SUCCESS":
      return { loading: false, declaration: action.payload };
    case "DECLARATION_GET_FAIL":
      return { loading: false, error: action.payload };
    case "DECLARATION_SELECTED_RESET_REQUEST":
      return {};
    default:
      return state;
  }
};

const markAsSeenReducer = (state = {}, action) => {
  switch (action.type) {
    case "DECLARATION_MARK_AS_SEEN_REQUEST":
      return { loading: true };
    case "DECLARATION_MARK_AS_SEEN_SUCCESS":
      return { loading: false, success: true };
    case "DECLARATION_MARK_AS_SEEN_FAIL":
      return { loading: false, error: action.payload };
    case "DECLARATION_MARK_AS_SEEN_RESET":
      return {};
    default:
      return state;
  }
};

const declarationUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "DECLARATION_UPDATE_REQUEST":
      return { loading: true };
    case "DECLARATION_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "DECLARATION_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "DECLARATION_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};

export {
  addDeclarationReducer,
  deleteDeclarationReducer,
  allDeclarationsGetReducer,
  oneDeclarationGetReducer,
  declarationUpdateReducer,
  markAsSeenReducer,
};
