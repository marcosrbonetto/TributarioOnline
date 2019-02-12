import { 
  MAIN_CONTENT_CARGANDO, 
  SET_TIPO_TRIBUTOS, 
  SET_TIPO_CEDULONES,
  SET_ESTADO_PAGOS,
  SET_PUBLIC_KEY_MERCADO_PAGO,
  PARA_MOBILE,
  SET_APLICACION_PANEL
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

export const setAplicacionPanel = datos => ({
  type: SET_APLICACION_PANEL,
  payload: datos
});

export const setPublicKeyMercadoPago = datos => ({
  type: SET_PUBLIC_KEY_MERCADO_PAGO,
  payload: datos
});

export const paraMobile = data => ({
  type: PARA_MOBILE,
  payload: data
});