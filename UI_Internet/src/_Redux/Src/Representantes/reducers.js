import {
    GET_TRIBUTOS_CUIT,
    GET_SOLICITUDES_PERMISOS,
    GET_MIS_REPRESENTANTES,
    GET_MIS_REPRESENTADOS,
    CANCELAR_SOLICITUD_PERMISOS,
    CAMBIAR_ESTADO_PERMISO,
    AGREGAR_REPRESENTADO_GRILLA
} from "@ReduxSrc/Representantes/constants";
import { debug } from "util";

const initialState = {
    GET_TRIBUTOS_CUIT: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIBUTOS_CUIT: {

            var datos = {};
            datos.representado = action.payload.return.titular.titular;
            datos.cuitRepresentado = action.payload.return.titular.cuit;
            datos.tributos = {};

            action.payload.return.automotores.length > 0 && Object.keys(action.payload.return.automotores).map((tributo) => {
                datos.tributos['automotores'] = {
                    label: 'Automotores',
                    tipo: 'automotores',
                    cantPermisos: 0,
                    tipoTributo: 1,
                    opciones: action.payload.return.automotores
                };
            });

            action.payload.return.inmuebles.length > 0 && Object.keys(action.payload.return.inmuebles).map((tributo) => {
                datos.tributos['inmuebles'] = {
                    label: 'Inmuebles',
                    tipo: 'inmuebles',
                    cantPermisos: 0,
                    tipoTributo: 2,
                    opciones: action.payload.return.inmuebles
                };
            });

            action.payload.return.comercios.length > 0 && Object.keys(action.payload.return.comercios).map((tributo) => {
                datos.tributos['comercios'] = {
                    label: 'Comercios',
                    tipo: 'comercios',
                    cantPermisos: 0,
                    tipoTributo: 3,
                    opciones: action.payload.return.comercios
                };
            });

            return Object.assign({ ...state }, state.datosEnvioSolicitudPermisos, {
                datosEnvioSolicitudPermisos: datos
            });
        }
        case GET_SOLICITUDES_PERMISOS: {

            var datos = [];
            action.payload.return.map((repr) => {
                var newRepresentante = {};
                newRepresentante.representante = repr.representante;
                newRepresentante.cuitRepresentante = repr.cuitRepresentante;
                newRepresentante.tributos = {};
                Object.keys(repr.tributos).map((tributo) => {
                    newRepresentante.tributos[tributo] = {
                        label: tributo,
                        tipo: tributo,
                        opciones: repr.tributos[tributo]
                    };
                });

                datos.push(newRepresentante);
            });

            return Object.assign({ ...state }, state.datosPedidoSolicitudPermisos, {
                datosPedidoSolicitudPermisos: datos
            });
        }
        case GET_MIS_REPRESENTANTES: {

            var datos = action.payload.return.map((repr) => {
                return {
                    usuario: repr.cuilRepresentante,
                    tributo: repr.identificador + ' - ' + repr.tipoTributo,
                    estado: repr.aceptado ? 'Aceptado' : 'Rechazado',
                    data: {
                        aceptado: repr.aceptado,
                        identificador: repr.identificador,
                        tipoTributo: repr.tipoTributo
                    }
                }
            });

            return Object.assign({ ...state }, state.datosMisRepresentantes, {
                datosMisRepresentantes: datos
            });
        }
        case GET_MIS_REPRESENTADOS: {

            var datos = action.payload.return.map((repr) => {
                return {
                    usuario: repr.cuilRepresentado,
                    tributo: repr.identificador + ' - ' + repr.tipoTributo,
                    estado: repr.aceptado ? 'Aceptado' : 'Rechazado',
                    data: {
                        aceptado: repr.aceptado,
                        identificador: repr.identificador,
                        tipoTributo: repr.tipoTributo
                    }
                }
            });

            return Object.assign({ ...state }, state.datosMisRepresentados, {
                datosMisRepresentados: datos
            });
        }
        case CANCELAR_SOLICITUD_PERMISOS: {
            return Object.assign({ ...state }, state.datosEnvioSolicitudPermisos, {
                datosEnvioSolicitudPermisos: {}
            });
        }
        case CAMBIAR_ESTADO_PERMISO: {

            let grilla = 'datosMisRepresentados';
            if(action.payload.grilla == 'MisRepresentantes')
                grilla = 'datosMisRepresentantes';

            var datos = action.payload.datosGrilla.map((repr) => {
                if (action.payload.datosFila.id == repr.id) {
                    return {
                        ...repr,
                        estado: !repr.data.aceptado ? 'Aceptado' : 'Rechazado',
                        data: {
                            ...repr.data,
                            aceptado: !repr.data.aceptado
                        }
                    }
                } else {
                    return repr;
                }
            });

            return Object.assign({ ...state }, state[grilla], {
                [grilla]: datos
            });
        }
        case AGREGAR_REPRESENTADO_GRILLA: {

            let datosGrilla = [...state.datosMisRepresentados];
            datosGrilla.push({
                usuario: action.payload.cuilRepresentado,
                tributo: action.payload.identificador + ' - ' + action.payload.tipoTributo,
                estado: action.payload.aceptado ? 'Aceptado' : 'Rechazado',
                data: {
                    aceptado: action.payload.aceptado,
                    identificador: action.payload.identificador,
                    tipoTributo: action.payload.tipoTributo
                }
            });

            return Object.assign({ ...state }, state.datosMisRepresentados, {
                datosMisRepresentados: datosGrilla
            });
        }
        default:
            return state;
    }
};
export default reducer;
