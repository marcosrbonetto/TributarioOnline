import { GET_CONCEPTOS_TRIBUTO } from "@ReduxTributarioOnline/DetalleTributario/Automotores/constants";

export const getConceptosTributo = datos => ({ 
    type: GET_CONCEPTOS_TRIBUTO,
    payload: datos
});
