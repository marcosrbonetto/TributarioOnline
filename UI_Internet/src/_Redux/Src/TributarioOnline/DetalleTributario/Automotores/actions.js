import { GET_CONCEPTOS_TRIBUTO } from "@ReduxTributarioOnline/DetalleTributario/Automotores/constants";

export const getConceptosTributo = (cuit,tipo) => ({ 
    type: GET_CONCEPTOS_TRIBUTO,
    payload: { 
        cuit: cuit,
        tipo: tipo
    }
});
