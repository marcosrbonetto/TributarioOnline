import { GET_INFO_CONTRIBUCION } from "@ReduxSrc/TributarioOnline/DetalleTributario/Automotores/constants";

export const getInfoContribucion = datos => ({ 
    type: GET_INFO_CONTRIBUCION,
    payload: datos
});
