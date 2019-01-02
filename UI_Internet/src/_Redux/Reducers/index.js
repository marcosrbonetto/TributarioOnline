import Usuario from "./usuario";
import Alerta from "./alerta";
import MainContent from "./mainContent";

import DetalleTributario from "@ReduxSrc/TributarioOnline/DetalleTributario/reducers";
import Representantes from "@ReduxSrc/Representantes/reducers";
import AfipController from "@ReduxSrc/AfipController/reducers";
import CaptchaAccess from "@ReduxSrc/CaptchaAccess/reducers";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  Usuario,
  Alerta,
  MainContent,
  DetalleTributario,
  Representantes,
  AfipController,
  CaptchaAccess
});

export default rootReducer;
