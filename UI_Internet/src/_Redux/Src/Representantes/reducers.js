import { GET_TRIBUTOS_CUIT, CANCELAR_SOLICITUD_PERMISOS } from "@ReduxSrc/Representantes/constants";

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

            return Object.assign({}, state.datosSolicitudPermisos, {
                datosSolicitudPermisos: datos
            });
        }
        case CANCELAR_SOLICITUD_PERMISOS: {
            return Object.assign({}, state.datosSolicitudPermisos, {
                datosSolicitudPermisos: {}
            });
        }
        default:
            return state;
    }
};
export default reducer;
