import { GET_ID_TRIBUTOS } from "@ReduxSrc/TributarioOnline/constants";

export const getIdTributos = (IdsTributos, tipoTributo) => ({ 
    type: GET_ID_TRIBUTOS,
    payload: IdsTributos,
    tipo: tipoTributo
});