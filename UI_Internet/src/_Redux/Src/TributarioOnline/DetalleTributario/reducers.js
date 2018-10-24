import { 
    GET_INFO_CONTRIBUCION, 
    GET_INFO_MULTAS,
    GET_INFO_JUICIOS_CONTR,
    GET_INFO_JUICIOS_MULTAS,
    GET_INFO_PLANES_PAGO,
    GET_INFO_ULTIMOS_PAGOS
} from "@ReduxSrc/TributarioOnline/DetalleTributario/constants";
import { stringToFloat, dateToString } from "@Utils/functions"

import React from "react";
import { Typography } from "@material-ui/core";
import MiControledPopover from "@Componentes/MiControledPopover";

const initialState = {
    infoContribucion: [],
    infoMultas: [],
    infoJuiciosContribucion: [],
    infoJuiciosMulta: [],
    infoPlanesPago: [],
    infoUltimosPagos: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INFO_CONTRIBUCION: {

            //Corroboramos que existan registros
            if(action.payload.return && action.payload.return.periodos.length > 0) {
                action.payload.return['rowList'] =  action.payload.return.periodos.map((concepto) => {
                    
                    return {
                        concepto: concepto.concepto,
                        vencimiento: dateToString(new Date(concepto.fecha),'DD/MM/YYYY'),
                        importe: stringToFloat(concepto.importe.total,2).toFixed(2),
                        detalle: <MiControledPopover textoLink="Detalle">
                                    <Typography>Base: <b>$ {concepto.importe.base}</b></Typography>
                                    <Typography>Recargo: <b>$ {concepto.importe.recargo}</b></Typography>
                                    <Typography>Deducción: <b>$ {concepto.importe.deduccion}</b></Typography>
                                    <Typography>Referencia: <b>{concepto.referencia}</b></Typography>
                                </MiControledPopover>,
                        data: concepto //atributo "data" no se muestra en MiTabla
                    }
                });
            } else {
                action.payload.return = {
                    rowList: []
                }
            }

            return Object.assign({...state}, state.infoContribucion, {
                infoContribucion: action.payload.return
            });
        }
        case GET_INFO_MULTAS: {

            //Corroboramos que existan registros
            if(action.payload.return && action.payload.return.periodos.length > 0) {
                action.payload.return['rowList'] =  action.payload.return.periodos.map((concepto) => {
                    
                    return {
                        concepto: concepto.concepto,
                        vencimiento: dateToString(new Date(concepto.fecha),'DD/MM/YYYY'),
                        importe: stringToFloat(concepto.importe.total,2).toFixed(2),
                        data: concepto //atributo "data" no se muestra en MiTabla
                    }
                });
            } else {
                action.payload.return = {
                    rowList: []
                }
            }

            return Object.assign({...state}, state.infoMultas, {
                infoMultas: action.payload.return
            });
        }
        case GET_INFO_JUICIOS_CONTR: {

            if(action.payload.return && action.payload.return.length > 0) {    
                action.payload.return['lista'] =  action.payload.return.map((juicio) => {

                    let rowList = juicio.periodos && juicio.periodos.map((concepto) => {
                    
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
                } else {
                    action.payload.return = {
                        lista: []
                    }
            }

            return Object.assign({...state}, state.infoJuiciosContribucion, {
                infoJuiciosContribucion: action.payload.return
            });
        }
        case GET_INFO_JUICIOS_MULTAS: {

            if(action.payload.return && action.payload.return.length > 0) {    
                action.payload.return['lista'] =  action.payload.return.map((juicio) => {

                    let rowList = juicio.periodos && juicio.periodos.map((concepto) => {
                    
                        return {
                            concepto: concepto.concepto,
                            vencimiento: dateToString(new Date(concepto.fecha),'DD/MM/YYYY'),
                            importe: stringToFloat(concepto.importe.total,2).toFixed(2),
                            data: concepto //atributo "data" no se muestra en MiTabla
                        }
                    });

                    return {
                        ...juicio,
                        idJuicio: juicio.identificador,
                        rowList: rowList
                    } 
                });
                } else {
                    action.payload.return = {
                        lista: []
                    }
            }

            return Object.assign({...state}, state.infoJuiciosMulta, {
                infoJuiciosMulta: action.payload.return
            });
        }
        case GET_INFO_PLANES_PAGO: {

            if(action.payload.return && action.payload.return.length > 0) {    
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
                } else {
                    action.payload.return = {
                        lista: []
                    }
            }

            return Object.assign({...state}, state.infoPlanesPago, {
                infoPlanesPago: action.payload.return
            });
        }
        case GET_INFO_ULTIMOS_PAGOS: {

            let rowList = (action.payload.return && action.payload.return.map((pago) => {
                    
                return {
                    concepto: pago.concepto,
                    fecha: dateToString(new Date(pago.fecha),'DD/MM/YYYY'),
                    importe: stringToFloat(pago.importe.total,2).toFixed(2),
                    detalle: <MiControledPopover textoLink="Detalle">
                                    <Typography>Base: <b>$ {pago.importe.base}</b></Typography>
                                    <Typography>Recargo: <b>$ {pago.importe.recargo}</b></Typography>
                                    <Typography>Deducción: <b>$ {pago.importe.deduccion}</b></Typography>
                                    <Typography>Citación: <b>{pago.citacion}</b></Typography>
                                    <Typography>CTL: <b>$ {pago.ctl}</b></Typography>
                                    <Typography>Estado: <b>$ {pago.estado}</b></Typography>
                                    <Typography>Caja: <b>$ {pago.caja}</b></Typography>
                                </MiControledPopover>,
                    data: pago //atributo "data" no se muestra en MiTabla
                }
            })) || [];

            return Object.assign({...state}, state.infoUltimosPagos, {
                infoUltimosPagos: rowList
            });
        }
        default:
            return state;
    }
};
export default reducer;
