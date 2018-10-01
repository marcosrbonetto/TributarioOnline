import { GET_CONCEPTOS_TRIBUTO } from "@ReduxSrc/TributarioOnline/DetalleTributario/Automotores/constants";
import { stringToFloat, dateToString } from "@Utils/functions"

const initialState = {
    GET_CONCEPTOS_TRIBUTO: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONCEPTOS_TRIBUTO: {

            var conceptos =  action.payload.return.map((concepto) => {
                
                return {
                    concepto: concepto.periodo,
                    vencimiento: dateToString(new Date(concepto.concepto),'DD/MM/YYYY'),
                    importe: stringToFloat(concepto.importe.total,2).toFixed(2),
                }
            });

            return Object.assign({}, state.GET_CONCEPTOS_TRIBUTO, {
                GET_CONCEPTOS_TRIBUTO: conceptos
            });
        }
        default:
            return state;
    }
};
export default reducer;
