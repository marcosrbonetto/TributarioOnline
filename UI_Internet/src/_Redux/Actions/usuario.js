import { USUARIO_LOGIN, USUARIO_CERRAR_SESION } from "@Redux/Constants/index";

export const login = usuario => ({ type: USUARIO_LOGIN, payload: usuario });
export const cerrarSesion = () => ({ type: USUARIO_CERRAR_SESION });
