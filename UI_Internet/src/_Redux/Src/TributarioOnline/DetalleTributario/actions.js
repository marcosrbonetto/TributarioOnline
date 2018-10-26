import { 
    GET_INFO_CONTRIBUCION, 
    GET_INFO_MULTAS,
    GET_INFO_JUICIOS_CONTR,
    GET_INFO_JUICIOS_MULTAS,
    GET_INFO_PLANES_PAGO,
    GET_INFO_ULTIMOS_PAGOS,
    GET_INFORME_ANTECEDENTES,
    GET_INFORME_REMAT,
} from "@ReduxSrc/TributarioOnline/DetalleTributario/constants";

export const getInfoContribucion = datos => ({ 
    type: GET_INFO_CONTRIBUCION,
    payload: datos
});

export const getInfoMultas = datos => ({ 
    type: GET_INFO_MULTAS,
    payload: datos
});

export const getInfoJuiciosContribucion = datos => ({ 
    type: GET_INFO_JUICIOS_CONTR,
    payload: datos
});

export const getInfoJuiciosMulta = datos => ({ 
    type: GET_INFO_JUICIOS_MULTAS,
    payload: datos
});

export const getInfoPlanesPago = datos => ({ 
    type: GET_INFO_PLANES_PAGO,
    payload: datos
});

export const getInfoUltimosPagos = datos => ({ 
    type: GET_INFO_ULTIMOS_PAGOS,
    payload: datos
});

export const getInfoInformeAntecedentes = datos => ({ 
    type: GET_INFO_ULTIMOS_PAGOS,
    payload: datos
});

export const getInfoInformeREMAT = datos => ({ 
    type: GET_INFO_ULTIMOS_PAGOS,
    payload: datos
});