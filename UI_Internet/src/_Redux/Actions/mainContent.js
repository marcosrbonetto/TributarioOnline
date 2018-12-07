import { 
  MAIN_CONTENT_CARGANDO, 
  SET_TIPO_TRIBUTOS, 
  SET_TIPO_CEDULONES,
  SET_TIPO_OPERACIONES
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

export const setTipoOperaciones = datos => ({
  type: SET_TIPO_OPERACIONES,
  payload: datos
});