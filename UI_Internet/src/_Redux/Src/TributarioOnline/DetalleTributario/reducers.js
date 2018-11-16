import {
    GET_INFO_CONTRIBUCION,
    GET_INFO_MULTAS,
    GET_INFO_JUICIOS_CONTR,
    GET_INFO_JUICIOS_MULTAS,
    GET_INFO_PLANES_PAGO,
    GET_INFO_ULTIMOS_PAGOS,
    GET_INFORME_ANTECEDENTES,
    GET_INFORME_REMAT,
    GET_INFORME_CUENTA,
    GET_REPORTE_INFORME_CUENTA,
    SET_PAGOS_MERCADO_PAGO,
    RESET_INFO_DETALLE_TRIBUTO,
    GET_REPORTE_INFORME_REMAT,
    GET_REPORTE_INFORME_ANTECEDENTES
} from "@ReduxSrc/TributarioOnline/DetalleTributario/constants";
import { stringToFloat, dateToString, formatNumber } from "@Utils/functions"

import React from "react";
import storePersistent from "@Redux/Store/persistent";
import { Typography } from "@material-ui/core";

import MiControledPopover from "@Componentes/MiControledPopover";
import MiTooltip from "@Componentes/MiTooltip";

let initialState = {
    infoContribucion: [],
    infoMultas: [],
    infoJuiciosContribucion: [],
    infoJuiciosMulta: [],
    infoPlanesPago: [],
    infoUltimosPagos: [],
    infoInformeAntecedentes: [],
    infoInformeREMAT: [],
    infoInformeCuenta: [],
    infoReporteInformeCuenta: [],
    infoPagosMercadoPago: [],
    infoReporteInformeREMAT: [],
    infoReporteInformeAntecedentes: [],
};


//Agrega al initialState lo que se seteo como permanente
initialState = storePersistent.getStorePersistent({
    reducer: 'DetalleTributario',
    state: initialState
});

const styles = {
    root: {
        background: 'red',
        color: 'blue',
        fontSize: 11,
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INFO_CONTRIBUCION: {

            let data = action.payload.return;
            //Corroboramos que existan registros
            if (data && data.periodos.length > 0) {
                data['rowList'] = data.periodos.map((concepto) => {

                    return {
                        concepto: concepto.concepto,
                        vencimiento: dateToString(new Date(concepto.fecha), 'DD/MM/YYYY'),
                        importe: formatNumber(concepto.importe.total),
                        detalle: <MiTooltip
                            contenidoDetalle={<div>
                                <Typography>Base: <b>$ {concepto.importe.base}</b></Typography>
                                <Typography>Recargo: <b>$ {concepto.importe.recargo}</b></Typography>
                                <Typography>Deducción: <b>$ {concepto.importe.deduccion}</b></Typography>
                                <Typography>Referencia: <b>{concepto.referencia}</b></Typography>
                            </div>}>
                            <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                        </MiTooltip>,
                        data: concepto //atributo "data" no se muestra en MiTabla
                    }
                });
            } else {
                data = {
                    ...data,
                    rowList: []
                }
            }

            return Object.assign({ ...state }, state.infoContribucion, {
                infoContribucion: data
            });
        }
        case GET_INFO_MULTAS: {

            let data = action.payload.return;
            //Corroboramos que existan registros
            if (data && data.periodos.length > 0) {
                data['rowList'] = data.periodos.map((concepto) => {

                    return {
                        concepto: concepto.concepto,
                        vencimiento: dateToString(new Date(concepto.fecha), 'DD/MM/YYYY'),
                        importe: formatNumber(concepto.importe.total),
                        detalle: <MiTooltip
                            contenidoDetalle={<div>
                                <Typography>Base: <b>$ {concepto.importe.base}</b></Typography>
                                <Typography>Recargo: <b>$ {concepto.importe.recargo}</b></Typography>
                                <Typography>Deducción: <b>$ {concepto.importe.deduccion}</b></Typography>
                                <Typography>Referencia: <b>{concepto.referencia}</b></Typography>
                            </div>}>
                            <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                        </MiTooltip>,
                        data: concepto //atributo "data" no se muestra en MiTabla
                    }
                });
            } else {
                data = {
                    ...data,
                    rowList: []
                }
            }

            return Object.assign({ ...state }, state.infoMultas, {
                infoMultas: data
            });
        }
        case GET_INFO_JUICIOS_CONTR: {

            let data = action.payload.return;
            if (data && data.length > 0) {
                data['lista'] = data.map((juicio) => {

                    let rowList = juicio.periodos && juicio.periodos.map((concepto) => {

                        return {
                            concepto: concepto.concepto,
                            vencimiento: dateToString(new Date(concepto.fecha), 'DD/MM/YYYY'),
                            importe: formatNumber(concepto.importe.total),
                            detalle: <MiTooltip
                                contenidoDetalle={<div>
                                    <Typography>Base: <b>$ {concepto.importe.base}</b></Typography>
                                    <Typography>Recargo: <b>$ {concepto.importe.recargo}</b></Typography>
                                    <Typography>Deducción: <b>$ {concepto.importe.deduccion}</b></Typography>
                                    <Typography>Referencia: <b>{concepto.referencia}</b></Typography>
                                </div>}>
                                <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                            </MiTooltip>,
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
                data = {
                    ...data,
                    lista: []
                }
            }

            return Object.assign({ ...state }, state.infoJuiciosContribucion, {
                infoJuiciosContribucion: data
            });
        }
        case GET_INFO_JUICIOS_MULTAS: {

            let data = action.payload.return;
            if (data && data.length > 0) {
                data['lista'] = data.map((juicio) => {

                    let rowList = juicio.periodos && juicio.periodos.map((concepto) => {

                        return {
                            concepto: concepto.concepto,
                            vencimiento: dateToString(new Date(concepto.fecha), 'DD/MM/YYYY'),
                            importe: formatNumber(concepto.importe.total),
                            detalle: <MiTooltip
                                contenidoDetalle={<div>
                                    <Typography>Base: <b>$ {concepto.importe.base}</b></Typography>
                                    <Typography>Recargo: <b>$ {concepto.importe.recargo}</b></Typography>
                                    <Typography>Deducción: <b>$ {concepto.importe.deduccion}</b></Typography>
                                    <Typography>Referencia: <b>{concepto.referencia}</b></Typography>
                                </div>}>
                                <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                            </MiTooltip>,
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
                data = {
                    ...data,
                    lista: []
                }
            }

            return Object.assign({ ...state }, state.infoJuiciosMulta, {
                infoJuiciosMulta: data
            });
        }
        case GET_INFO_PLANES_PAGO: {

            let data = action.payload.return;
            if (data && data.length > 0) {
                data['lista'] = data.map((plan) => {

                    let rowList = plan.periodos.map((concepto) => {

                        return {
                            concepto: concepto.concepto,
                            vencimiento: dateToString(new Date(concepto.fecha), 'DD/MM/YYYY'),
                            importe: formatNumber(concepto.importe.total),
                            detalle: <MiTooltip
                                contenidoDetalle={<div>
                                    <Typography>Base: <b>$ {concepto.importe.base}</b></Typography>
                                    <Typography>Recargo: <b>$ {concepto.importe.recargo}</b></Typography>
                                    <Typography>Deducción: <b>$ {concepto.importe.deduccion}</b></Typography>
                                    <Typography>Referencia: <b>{concepto.referencia}</b></Typography>
                                </div>}>
                                <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                            </MiTooltip>,
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
                data = {
                    ...data,
                    lista: []
                }
            }

            return Object.assign({ ...state }, state.infoPlanesPago, {
                infoPlanesPago: data
            });
        }
        case GET_INFO_ULTIMOS_PAGOS: {

            let rowList = (action.payload.return && action.payload.return.map((pago) => {

                return {
                    concepto: pago.concepto,
                    fecha: dateToString(new Date(pago.fecha), 'DD/MM/YYYY'),
                    importe: formatNumber(pago.importe.total),
                    detalle: <MiTooltip
                        contenidoDetalle={<div>
                            <Typography>Base: <b>$ {pago.importe.base}</b></Typography>
                            <Typography>Recargo: <b>$ {pago.importe.recargo}</b></Typography>
                            <Typography>Deducción: <b>$ {pago.importe.deduccion}</b></Typography>
                            <Typography>Citación: <b>{pago.citacion}</b></Typography>
                            <Typography>CTL: <b>$ {pago.ctl}</b></Typography>
                            <Typography>Estado: <b>$ {pago.estado}</b></Typography>
                            <Typography>Caja: <b>$ {pago.caja}</b></Typography>
                        </div>}>
                        <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                    </MiTooltip>,
                    data: pago //atributo "data" no se muestra en MiTabla
                }
            })) || [];

            return Object.assign({ ...state }, state.infoUltimosPagos, {
                infoUltimosPagos: rowList
            });
        }
        case GET_INFORME_ANTECEDENTES: {

            let rowList = (action.payload.return && action.payload.return.map((row) => {

                return {
                    causa: row.causa,
                    fecha: dateToString(new Date(row.fecha), 'DD/MM/YYYY'),
                    infraccion: row.infraccion,
                    detalle: <MiTooltip
                        contenidoDetalle={<div>
                            <Typography>Juzg.: <b>{row.juzgado}</b></Typography>
                            <Typography>Fallo: <b>{row.fallo}</b></Typography>
                            <Typography>Cad.: <b>{row.caducidad}</b></Typography>
                            <Typography>Acumulada: <b>{row.acumulada}</b></Typography>
                        </div>}>
                        <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                    </MiTooltip>,
                    data: row //atributo "data" no se muestra en MiTabla
                }
            })) || [];

            return Object.assign({ ...state }, state.infoInformeAntecedentes, {
                infoInformeAntecedentes: rowList
            });
        }
        case GET_INFORME_REMAT: {

            let rowList = (action.payload.return && action.payload.return.map((row) => {

                return {
                    causa: row.causa,
                    fecha: dateToString(new Date(row.fecha), 'DD/MM/YYYY'),
                    infraccion: row.infraccion,
                    detalle: <MiTooltip
                        contenidoDetalle={<div>
                            <Typography>Juzg.: <b>{row.juzgado}</b></Typography>
                            <Typography>Fallo: <b>{row.fallo}</b></Typography>
                            <Typography>Acumulada: <b>{row.acumulada}</b></Typography>
                        </div>}>
                        <i class="material-icons" style={{ color: '#149257', cursor: 'help' }}>add_circle_outline</i>
                    </MiTooltip>,
                    data: row //atributo "data" no se muestra en MiTabla
                }
            })) || [];

            return Object.assign({ ...state }, state.infoInformeREMAT, {
                infoInformeREMAT: rowList
            });
        }
        case GET_INFORME_CUENTA: {
            return Object.assign({ ...state }, state.infoInformeCuenta, {
                infoInformeCuenta: action.payload.return
            });
        }
        case GET_REPORTE_INFORME_CUENTA: {
            return Object.assign({ ...state }, state.infoReporteInformeCuenta, {
                infoReporteInformeCuenta: action.payload.return
            });
        }
        case GET_REPORTE_INFORME_REMAT: {

            return Object.assign({ ...state }, state.infoReporteInformeREMAT, {
                infoReporteInformeREMAT: action.payload.return
            });
        }
        case GET_REPORTE_INFORME_ANTECEDENTES: {

            return Object.assign({ ...state }, state.infoReporteInformeAntecedentes, {
                infoReporteInformeAntecedentes: action.payload.return
            });
        }
        case SET_PAGOS_MERCADO_PAGO: {
            //Persiste los datos para que no se pierdan al actualizar la página
            return storePersistent.setStorePersistent({
                reducer: 'DetalleTributario',
                state: state,
                sectionReducer: 'infoPagosMercadoPago',
                info: action.payload
            });
        }
        case RESET_INFO_DETALLE_TRIBUTO: {
            //Se resetean todos lo valores de la pantalla.
            let emptyState = {
                infoContribucion: [],
                infoMultas: [],
                infoJuiciosContribucion: [],
                infoJuiciosMulta: [],
                infoPlanesPago: [],
                infoUltimosPagos: [],
                infoInformeAntecedentes: [],
                infoInformeREMAT: [],
                infoInformeCuenta: [],
                infoReporteInformeCuenta: [],
                infoPagosMercadoPago: [],
                infoReporteInformeREMAT: [],
                infoReporteInformeAntecedentes: [],
            };

            //Agregamos datos persistentes
            const newState = storePersistent.getStorePersistent({
                reducer: 'DetalleTributario',
                state: emptyState
            });

            return newState;
        }
        default:
            return state;
    }
};
export default reducer;
