import { 
    GET_INFO_CONTRIBUCION, 
    GET_INFO_MULTAS,
    GET_DATOS_CUENTA 
} from "@ReduxSrc/TributarioOnline/DetalleTributario/constants";
import { stringToFloat, dateToString } from "@Utils/functions"

const initialState = {
    infoContribucion: [],
    infoMultas: [],
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

            return Object.assign({...state}, state.infoContribucion, {
                infoContribucion: action.payload.return
            });
        }
        case GET_INFO_MULTAS: {

            action.payload.return['rowList'] =  action.payload.return.periodos.map((concepto) => {
                
                return {
                    concepto: concepto.item,
                    vencimiento: dateToString(new Date(concepto.fecha),'DD/MM/YYYY'),
                    importe: stringToFloat(concepto.importe.total,2).toFixed(2),
                    data: concepto //atributo "data" no se muestra en MiTabla
                }
            });

            return Object.assign({...state}, state.infoMultas, {
                infoMultas: action.payload.return
            });
        }
        case GET_DATOS_CUENTA: {
debugger;
            return Object.assign({...state}, state.infoMultas, {
                datosCuenta: action.payload.return
            });
        }
        default:
            return state;
    }
};
export default reducer;
