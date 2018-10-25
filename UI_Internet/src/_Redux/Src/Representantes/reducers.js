import {
    GET_TRIBUTOS_CUIT,
    GET_SOLICITUDES_PERMISOS,
    GET_MIS_REPRESENTANTES,
    GET_MIS_REPRESENTADOS,
    CANCELAR_SOLICITUD_PERMISOS,
    CAMBIAR_ESTADO_PERMISO,
    AGREGAR_REPRESENTADO_GRILLA
} from "@ReduxSrc/Representantes/constants";
import _ from "lodash";

const initialState = {
    GET_TRIBUTOS_CUIT: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIBUTOS_CUIT: {

            var datos = {};

            if(Array.isArray(action.payload.return) && action.payload.return.length > 0) {
                datos.representado = action.payload.return[0].titular.titular;
                datos.cuitRepresentado = action.payload.return[0].titular.cuit;
                datos.tributos = {};

                var arrayAutomotores = _.filter(action.payload.return, {tipoTributo: 1});
                var arrayInmuebles = _.filter(action.payload.return, {tipoTributo: 2});
                var arrayComercios = _.filter(action.payload.return, {tipoTributo: 3});

                arrayAutomotores.length > 0 && Object.keys(arrayAutomotores).map((tributo) => {
                    datos.tributos['automotores'] = {
                        label: 'Automotores',
                        tipo: 'automotores',
                        cantPermisos: 0,
                        tributosSelec: [],
                        tipoTributo: 1,
                        opciones: arrayAutomotores
                    };
                });

                arrayInmuebles.length > 0 && Object.keys(arrayInmuebles).map((tributo) => {
                    datos.tributos['inmuebles'] = {
                        label: 'Inmuebles',
                        tipo: 'inmuebles',
                        cantPermisos: 0,
                        tributosSelec: [],
                        tipoTributo: 2,
                        opciones: arrayInmuebles
                    };
                });

                arrayComercios.length > 0 && Object.keys(arrayComercios).map((tributo) => {
                    datos.tributos['comercios'] = {
                        label: 'Comercios',
                        tipo: 'comercios',
                        cantPermisos: 0,
                        tributosSelec: [],
                        tipoTributo: 3,
                        opciones: arrayComercios
                    };
                });
            }

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
                const nombreTributo = repr.tipoTributo.nombre.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
                return {
                    usuario: repr.representante,
                    tributo: repr.identificador + ' - ' + nombreTributo,
                    estado: repr.aceptado ? 'Aceptado' : 'Rechazado',
                    eliminarPermiso: null, //type "custom" - se carga en pantalla ya que contiene logica
                    data: {
                        aceptado: repr.aceptado,
                        identificador: repr.identificador,
                        tipoTributo: repr.tipoTributo.keyValue
                    }
                }
            });

            return Object.assign({ ...state }, state.datosMisRepresentantes, {
                datosMisRepresentantes: datos
            });
        }
        case GET_MIS_REPRESENTADOS: {

            var datos = action.payload.return.map((repr) => {
                const nombreTributo = repr.tipoTributo.nombre.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
                return {
                    usuario: repr.representado,
                    tributo: repr.identificador + ' - ' + nombreTributo,
                    estado: repr.aceptado ? 'Aceptado' : 'Rechazado',
                    eliminarPermiso: null, //type "custom" - se carga en pantalla ya que contiene logica
                    data: {
                        aceptado: repr.aceptado,
                        identificador: repr.identificador,
                        tipoTributo: repr.tipoTributo.keyValue
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
                        eliminarPermiso: null, //type "custom" - se carga en pantalla ya que contiene logica
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
                eliminarPermiso: null, //type "custom" - se carga en pantalla ya que contiene logica
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
