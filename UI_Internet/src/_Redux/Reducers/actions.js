import { GET_ID_TRIBUTOS } from "@ReduxSrc/TributarioOnline/constants";

export const getIdTributos = datos => ({ 
    type: GET_ID_TRIBUTOS, 
    payload: datos
});