import { 
    GET_TRIBUTOS_CUIT, 
    GET_SOLICITUDES_PERMISOS, 
    GET_MIS_REPRESENTANTES, 
    GET_MIS_REPRESENTADOS, 
    CANCELAR_SOLICITUD_PERMISOS,
    CAMBIAR_ESTADO_PERMISO
} from "@ReduxSrc/Representantes/constants";

export const cambiarEstadoPermiso = datos => ({ 
    type: CAMBIAR_ESTADO_PERMISO, 
    payload: datos
});

export const getTributosCUIT = datos => ({ 
    type: GET_TRIBUTOS_CUIT, 
    payload: datos
});

export const getSolicitudesPermiso = datos => ({ 
    type: GET_SOLICITUDES_PERMISOS, 
    payload: datos
});

export const getMisRepresentantes = datos => ({ 
    type: GET_MIS_REPRESENTANTES, 
    payload: datos
});

export const getMisRepresentados = datos => ({ 
    type: GET_MIS_REPRESENTADOS, 
    payload: datos
});

export const cancelSolicitudPermisos = () => ({ 
    type: CANCELAR_SOLICITUD_PERMISOS
});
