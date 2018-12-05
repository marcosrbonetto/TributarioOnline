import {
  MAIN_CONTENT_CARGANDO,
  SET_TIPO_TRIBUTOS,
  SET_TIPO_CEDULONES
} from "@Redux/Constants/index";
import _ from "lodash";

const initialState = {
  cargando: false,
  loggedUser: {},
  cantProcesosCargando: 0,
  tipoTributos: {},
  tipoCedulones: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_CONTENT_CARGANDO: {
      let newState = { ...state };

      const cargar = action.payload;
      if (cargar) {
        newState.cargando = cargar;
        newState.cantProcesosCargando += 1;
      } else {
        //Corroboramos que no exista procesos cargando
        if (newState.cantProcesosCargando > 0)
          newState.cantProcesosCargando -= 1;

        if (newState.cantProcesosCargando == 0)
          newState.cargando = cargar;
      }

      return newState;
    }
    case SET_TIPO_TRIBUTOS: {
      let tipoTributos = {};

      tipoTributos['byKey'] = {};
      tipoTributos['byValue'] = {};
      tipoTributos['result'] = {};

      _.each(action.payload, (item) => {
        tipoTributos.byKey[item.key] = item.value;
        tipoTributos.byValue[item.value] = item.key;
      });

      tipoTributos['result'] = action.payload;
      debugger;
      return { ...state, tipoTributos: tipoTributos };
    }
    case SET_TIPO_CEDULONES: {
      let tipoCedulones = {};

      tipoCedulones['byKey'] = {};
      tipoCedulones['byValue'] = {};
      tipoCedulones['result'] = {};

      _.each(action.payload, (item) => {
        tipoCedulones.byKey[item.key] = item.value;
        tipoCedulones.byValue[item.value] = item.key;
      });

      tipoCedulones['result'] = action.payload;
      debugger;
      return { ...state, tipoCedulones: tipoCedulones };
    }
    default:
      return state;
  }
};
export default reducer;
