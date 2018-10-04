import { GET_INFO_TRIBUTO } from "@ReduxSrc/TributarioOnline/DetalleTributario/Automotores/constants";

export const getInfoTributo = datos => ({ 
    type: GET_INFO_TRIBUTO,
    payload: datos
});
