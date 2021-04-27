import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  userCreateReducer,
  userDeclarationsReducer,
  userDeleteReducer,
  userInfosReducer,
  userLoginReducer,
  userRegisterReducer,
  userSendEmailReducer,
  userUpdatePasswordReducer,
  userUpdateReducer,
} from "./3-reducers/userReducers";
import Cookie from "js-cookie";
import {
  poleAddReducer,
  allPolesGetReducer,
  onePoleGetReducer,
  poleUpdateReducer,
  polePraticiensGetReducer,
  poleDeleteReducer,
} from "./3-reducers/poleReducers";
import {
  allSpecialitesGetReducer,
  deleteSpecialiteReducer,
  oneSpecialitesGetReducer,
  specialiteAddReducer,
  specialiteUpdateReducer,
} from "./3-reducers/specialiteReducers";
import {
  addDeclarationReducer,
  allDeclarationsGetReducer,
  declarationUpdateReducer,
  deleteDeclarationReducer,
  markAsSeenReducer,
  oneDeclarationGetReducer,
} from "./3-reducers/declarationReducers";
import { getAllUsersReducer } from "./3-reducers/dataReducers";
import {
  addMentionsReducer,
  addMetierReducer,
  addTrancheReducer,
  deleteMetierReducer,
  downloadFicheReducer,
  mentionsGetReducer,
  metiersGetReducer,
  tranchesGetReducer,
  updateMentionsReducer,
  updateTrancheReducer,
} from "./3-reducers/DonneesGlobalesReducers";

const userInfos = Cookie.getJSON("userInfos") || null;

const initialState = {
  userLogin: {
    loading: false,
    userLoginInfos: userInfos,
  },
};

const reducer = combineReducers({
  getAllUsers: getAllUsersReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userInfos: userInfosReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userCreate: userCreateReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userDeclarations: userDeclarationsReducer,
  userSendEmail: userSendEmailReducer,
  allPolesGet: allPolesGetReducer,
  poleSelected: onePoleGetReducer,
  poleAdd: poleAddReducer,
  poleDelete: poleDeleteReducer,
  poleUpdated: poleUpdateReducer,
  polePraticiens: polePraticiensGetReducer,
  allSpecialitesGet: allSpecialitesGetReducer,
  specialiteSelected: oneSpecialitesGetReducer,
  specialiteAdd: specialiteAddReducer,
  specialiteDelete: deleteSpecialiteReducer,
  specialiteUpdated: specialiteUpdateReducer,
  allDeclarationsGet: allDeclarationsGetReducer,
  declarationSelected: oneDeclarationGetReducer,
  declarationAdd: addDeclarationReducer,
  declarationDelete: deleteDeclarationReducer,
  declarationUpdated: declarationUpdateReducer,
  declarationMarkAsSeen: markAsSeenReducer,
  metierAdd: addMetierReducer,
  metiersGet: metiersGetReducer,
  metierDelete: deleteMetierReducer,
  trancheAdd: addTrancheReducer,
  tranchesGet: tranchesGetReducer,
  trancheUpdate: updateTrancheReducer,
  mentionsAdd: addMentionsReducer,
  mentionsGet: mentionsGetReducer,
  mentionsUpdate: updateMentionsReducer,
  ficheDownload: downloadFicheReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
