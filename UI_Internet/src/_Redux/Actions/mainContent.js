import { 
  MAIN_CONTENT_CARGANDO, 
  SET_TIPO_TRIBUTOS, 
  SET_TIPO_CEDULONES,
  SET_ESTADO_PAGOS
} from "@Redux/Constants/index";

export const mostrarCargando = cargando => ({
  type: MAIN_CONTENT_CARGANDO,
  payload: cargando
});

export const setTipoTributos = datos => ({
  type: SET_TIPO_TRIBUTOS,
  payload: datos
});

export const setTipoCedulones = datos => ({
  type: SET_TIPO_CEDULONES,
  payload: datos
});

export const setEstadoPagos = datos => ({
  type: SET_ESTADO_PAGOS,
  payload: datos
});