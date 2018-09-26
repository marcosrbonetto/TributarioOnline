import { GET_ID_TRIBUTOS } from "@ReduxTributarioOnline/constants";

export const getIdTributos = IdsTributos => ({ 
    type: GET_ID_TRIBUTOS, 
    payload: IdsTributos
});