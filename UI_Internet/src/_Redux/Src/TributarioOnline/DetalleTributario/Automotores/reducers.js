import { GET_INFO_CONTRIBUCION } from "@ReduxSrc/TributarioOnline/DetalleTributario/Automotores/constants";
import { stringToFloat, dateToString } from "@Utils/functions"

const initialState = {
    infoTributo: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INFO_CONTRIBUCION: {

            action.payload.return['rowList'] =  action.payload.return.periodos.map((concepto) => {
                
                return {
                    concepto: concepto.item,
                    vencimiento: dateToString(new Date(concepto.fecha),'DD/MM/YYYY'),
                    importe: stringToFloat(concepto.importe.total,2).toFixed(2),
                    data: concepto //atributo "data" no se muestra en MiTabla
                }
            });

            return Object.assign({}, state.infoTributo, {
                infoTributo: action.payload.return
            });
        }
        default:
            return state;
    }
};
export default reducer;
