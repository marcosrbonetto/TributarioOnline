import { GET_TRIBUTOS_CUIT, GET_SOLICITUDES_PERMISOS, CANCELAR_SOLICITUD_PERMISOS } from "@ReduxSrc/Representantes/constants";

const initialState = {
    GET_TRIBUTOS_CUIT: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIBUTOS_CUIT: {

            var datos = {};
            datos.representado = action.payload.return.representado;
            datos.cuitRepresentado = action.payload.return.cuitRepresentado;
            datos.tributos = {};
            Object.keys(action.payload.return.tributos).map((tributo) => {
                datos.tributos[tributo] = {
                    label: tributo,
                    tipo: tributo,
                    cantPermisos: 0,
                    opciones: action.payload.return.tributos[tributo]
                };
            });

            return Object.assign({}, state.datosEnvioSolicitudPermisos, {
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

            return Object.assign({}, state.datosPedidoSolicitudPermisos, {
                datosPedidoSolicitudPermisos: datos
            });
        }
        case CANCELAR_SOLICITUD_PERMISOS: {
            return Object.assign({}, state.datosEnvioSolicitudPermisos, {
                datosEnvioSolicitudPermisos: {}
            });
        }
        default:
            return state;
    }
};
export default reducer;
