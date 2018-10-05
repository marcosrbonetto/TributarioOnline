import { GET_INFO_CONTRIBUCION, GET_INFO_MULTAS } from "@ReduxSrc/TributarioOnline/DetalleTributario/constants";

export const getInfoContribucion = datos => ({ 
    type: GET_INFO_CONTRIBUCION,
    payload: datos
});

export const getInfoMultas = datos => ({ 
    type: GET_INFO_MULTAS,
    payload: datos
});
