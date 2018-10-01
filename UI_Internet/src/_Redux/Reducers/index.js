import Usuario from "./usuario";
import Alerta from "./alerta";
import MainContent from "./mainContent";

import TributarioOnline from "@ReduxSrc/TributarioOnline/reducers";
import Automotores from "@ReduxSrc/TributarioOnline/DetalleTributario/Automotores/reducers";
import Representantes from "@ReduxSrc/Representantes/reducers";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  Usuario,
  Alerta,
  MainContent,
  TributarioOnline,
  Automotores,
  Representantes
});

export default rootReducer;
