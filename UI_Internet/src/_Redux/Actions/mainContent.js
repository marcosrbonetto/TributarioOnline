import { MAIN_CONTENT_CARGANDO, LOGIN_USER } from "@Redux/Constants/index";

export const mostrarCargando = cargando => ({
  type: MAIN_CONTENT_CARGANDO,
  payload: cargando
});

export const loginUser = data => ({
  type: LOGIN_USER,
  payload: data
});