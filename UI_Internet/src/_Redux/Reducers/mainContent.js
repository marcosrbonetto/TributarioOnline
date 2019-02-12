import {
  MAIN_CONTENT_CARGANDO,
  SET_TIPO_TRIBUTOS,
  SET_TIPO_CEDULONES,
  SET_ESTADO_PAGOS,
  SET_PUBLIC_KEY_MERCADO_PAGO,
  PARA_MOBILE,
  SET_APLICACION_PANEL
} from "@Redux/Constants/index";
import _ from "lodash";

const initialState = {
  cargando: false,
  loggedUser: {},
  cantProcesosCargando: 0,
  tipoTributos: {},
  tipoCedulones: {},
  estadoPagos: {},
  publicKeyMercadoPago: '',
  paraMobile: false,
  aplicacionesPanel: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_CONTENT_CARGANDO: {
      let newState = { ...state };

      const cargar = action.payload;
      if(cargar == 'reset') {
        newState.cantProcesosCargando = 0;
      } else if (cargar) {
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
      return { ...state, tipoCedulones: tipoCedulones };
    }
    case SET_ESTADO_PAGOS: {
      let estadoPagos = {};

      estadoPagos['byKey'] = {};
      estadoPagos['byValue'] = {};
      estadoPagos['result'] = {};

      _.each(action.payload, (item) => {
        estadoPagos.byKey[item.key] = item.value;
        estadoPagos.byValue[item.value] = item.key;
      });

      estadoPagos['result'] = action.payload;
      return { ...state, estadoPagos: estadoPagos };
    }
    case SET_PUBLIC_KEY_MERCADO_PAGO: {
      return { ...state, publicKeyMercadoPago: action.payload };
    }
    case PARA_MOBILE: {
      return { ...state, paraMobile: action.payload };
    }
    case SET_APLICACION_PANEL: {
      return { ...state, aplicacionesPanel: action.payload };
    }
    default:
      return state;
  }
};
export default reducer;
