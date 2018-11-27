import { MAIN_CONTENT_CARGANDO } from "@Redux/Constants/index";
import { SET_TIPO_TRIBUTOS } from "@Redux/Constants/index";

export const mostrarCargando = cargando => ({
  type: MAIN_CONTENT_CARGANDO,
  payload: cargando
});

export const setTipoTributos = datos => ({
  type: SET_TIPO_TRIBUTOS,
  payload: datos
});