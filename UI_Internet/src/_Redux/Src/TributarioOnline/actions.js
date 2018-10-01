import { GET_ID_TRIBUTOS } from "@ReduxSrc/TributarioOnline/constants";

export const getIdTributos = IdsTributos => ({ 
    type: GET_ID_TRIBUTOS, 
    payload: IdsTributos
});