import Usuario from "./usuario";
import Alerta from "./alerta";
import MainContent from "./mainContent";

import Automotores from "@ReduxTributarioOnline/reducers";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  Usuario,
  Alerta,
  MainContent,
  Automotores
});

export default rootReducer;
