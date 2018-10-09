import { 
    GET_INFO_CONTRIBUCION, 
    GET_INFO_MULTAS,
    GET_INFO_JUICIOS_CONTR,
    GET_INFO_JUICIOS_MULTAS,
    GET_INFO_PLANES_PAGO
} from "@ReduxSrc/TributarioOnline/DetalleTributario/constants";
import { stringToFloat, dateToString } from "@Utils/functions"

const initialState = {
    infoContribucion: [],
    infoMultas: [],
    infoJuiciosContribucion: [],
    infoJuiciosMulta: [],
    infoPlanesPago: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INFO_CONTRIBUCION: {

            action.payload.return['rowList'] =  action.payload.return.periodos.map((concepto) => {
                
                return {
                    concepto: concepto.concepto,
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
                    concepto: concepto.concepto,
                    vencimiento: dateToString(new Date(concepto.fecha),'DD/MM/YYYY'),
                    importe: stringToFloat(concepto.importe.total,2).toFixed(2),
                    data: concepto //atributo "data" no se muestra en MiTabla
                }
            });

            return Object.assign({...state}, state.infoMultas, {
                infoMultas: action.payload.return
            });
        }
        case GET_INFO_JUICIOS_CONTR: {

            action.payload.return['lista'] =  action.payload.return.map((juicio) => {

                let rowList = juicio.periodos.map((concepto) => {
                
                    return {
                        concepto: concepto.concepto,
                        vencimiento: dateToString(new Date(concepto.fecha),'DD/MM/YYYY'),
                        importe: stringToFloat(concepto.importe.total,2).toFixed(2),
                        data: concepto //atributo "data" no se muestra en MiTabla
                    }
                })

                return {
                    ...juicio,
                    idJuicio: juicio.identificador,
                    rowList: rowList
                } 
            });

            return Object.assign({...state}, state.infoJuiciosContribucion, {
                infoJuiciosContribucion: action.payload.return
            });
        }
        case GET_INFO_JUICIOS_MULTAS: {

            action.payload.return['lista'] =  action.payload.return.map((juicio) => {

                let rowList = juicio.periodos.map((concepto) => {
                
                    return {
                        concepto: concepto.concepto,
                        vencimiento: dateToString(new Date(concepto.fecha),'DD/MM/YYYY'),
                        importe: stringToFloat(concepto.importe.total,2).toFixed(2),
                        data: concepto //atributo "data" no se muestra en MiTabla
                    }
                })

                return {
                    ...juicio,
                    idJuicio: juicio.identificador,
                    rowList: rowList
                } 
            });

            return Object.assign({...state}, state.infoJuiciosMulta, {
                infoJuiciosMulta: action.payload.return
            });
        }
        case GET_INFO_PLANES_PAGO: {

            action.payload.return['lista'] =  action.payload.return.map((plan) => {

                let rowList = plan.periodos.map((concepto) => {
                
                    return {
                        concepto: concepto.concepto,
                        vencimiento: dateToString(new Date(concepto.fecha),'DD/MM/YYYY'),
                        importe: stringToFloat(concepto.importe.total,2).toFixed(2),
                        data: concepto //atributo "data" no se muestra en MiTabla
                    }
                })

                return {
                    ...plan,
                    idPlan: plan.identificador,
                    rowList: rowList
                } 
            });

            return Object.assign({...state}, state.infoPlanesPago, {
                infoPlanesPago: action.payload.return
            });
        }
        default:
            return state;
    }
};
export default reducer;
