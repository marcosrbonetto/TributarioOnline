import { 
    GET_INFO_CONTRIBUCION, 
    GET_INFO_MULTAS,
    GET_DATOS_CUENTA 
} from "@ReduxSrc/TributarioOnline/DetalleTributario/constants";

export const getInfoContribucion = datos => ({ 
    type: GET_INFO_CONTRIBUCION,
    payload: datos
});

export const getInfoMultas = datos => ({ 
    type: GET_INFO_MULTAS,
    payload: datos
});

export const getDatosCuenta = datos => ({ 
    type: GET_DATOS_CUENTA,
    payload: datos
});