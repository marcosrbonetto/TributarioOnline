import { GET_ID_TRIBUTOS } from "@ReduxTributarioOnline/constants";

export const getIdTributos = datos => ({ 
    type: GET_ID_TRIBUTOS, 
    payload: datos
});