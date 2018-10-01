import { GET_CONCEPTOS_TRIBUTO } from "@ReduxSrc/TributarioOnline/DetalleTributario/Automotores/constants";

export const getConceptosTributo = datos => ({ 
    type: GET_CONCEPTOS_TRIBUTO,
    payload: datos
});
