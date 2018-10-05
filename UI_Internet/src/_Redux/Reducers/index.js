import Usuario from "./usuario";
import Alerta from "./alerta";
import MainContent from "./mainContent";

import TributarioOnline from "@ReduxSrc/TributarioOnline/reducers";
import DetalleTributario from "@ReduxSrc/TributarioOnline/DetalleTributario/reducers";
import Representantes from "@ReduxSrc/Representantes/reducers";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  Usuario,
  Alerta,
  MainContent,
  TributarioOnline,
  DetalleTributario,
  Representantes
});

export default rootReducer;
