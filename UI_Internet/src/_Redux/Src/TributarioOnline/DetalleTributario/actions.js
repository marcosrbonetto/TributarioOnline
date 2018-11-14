import { 
    GET_INFO_CONTRIBUCION, 
    GET_INFO_MULTAS,
    GET_INFO_JUICIOS_CONTR,
    GET_INFO_JUICIOS_MULTAS,
    GET_INFO_PLANES_PAGO,
    GET_INFO_ULTIMOS_PAGOS,
    GET_INFORME_ANTECEDENTES,
    GET_INFORME_REMAT,
    GET_INFORME_CUENTA,
    GET_REPORTE_INFORME_CUENTA,
    SET_PAGOS_MERCADO_PAGO,
    GET_PAGOS_MERCADO_PAGO,
    RESET_INFO_DETALLE_TRIBUTO,
    GET_REPORTE_INFORME_REMAT,
    GET_REPORTE_INFORME_ANTECEDENTES
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
    type: GET_INFORME_ANTECEDENTES,
    payload: datos
});

export const getInfoInformeREMAT = datos => ({ 
    type: GET_INFORME_REMAT,
    payload: datos
});

export const getInfoInformeCuenta = datos => ({ 
    type: GET_INFORME_CUENTA,
    payload: datos
});

export const getInfoReporteInformeCuenta = datos => ({ 
    type: GET_REPORTE_INFORME_CUENTA,
    payload: datos
});

export const setPagosMercadoPago = datos => ({ 
    type: SET_PAGOS_MERCADO_PAGO,
    payload: datos
});

export const resetInfoDetalleTributo = datos => ({ 
    type: RESET_INFO_DETALLE_TRIBUTO,
    payload: datos
});

export const getInfoReporteInformeREMAT = datos => ({ 
    type: GET_REPORTE_INFORME_REMAT,
    payload: datos
});

export const getInfoReporteInformeAntecedentes = datos => ({ 
    type: GET_REPORTE_INFORME_ANTECEDENTES,
    payload: datos
});