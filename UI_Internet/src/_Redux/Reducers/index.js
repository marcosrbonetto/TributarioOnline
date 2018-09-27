import Usuario from "./usuario";
import Alerta from "./alerta";
import MainContent from "./mainContent";

import TributarioOnline from "@ReduxTributarioOnline/reducers";
import Automotores from "@ReduxTributarioOnline/DetalleTributario/Automotores/reducers";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  Usuario,
  Alerta,
  MainContent,
  TributarioOnline,
  Automotores
});

export default rootReducer;
