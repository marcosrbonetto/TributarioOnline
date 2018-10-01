import { GET_TRIBUTOS_CUIT, CANCELAR_SOLICITUD_PERMISOS } from "@ReduxSrc/Representantes/constants";

export const getTributosCUIT = tributos => ({ 
    type: GET_TRIBUTOS_CUIT, 
    payload: tributos
});

export const cancelSolicitudPermisos = () => ({ 
    type: CANCELAR_SOLICITUD_PERMISOS
});
