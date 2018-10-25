import { GET_ID_TRIBUTOS } from "@ReduxSrc/TributarioOnline/constants";
import _ from "lodash";

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ID_TRIBUTOS: {
            let IdsTributos = {}

            var arrayAutomotores = _.filter(action.payload.return, {tipoTributo: 1});
            var arrayInmuebles = _.filter(action.payload.return, {tipoTributo: 2});
            var arrayComercios = _.filter(action.payload.return, {tipoTributo: 3});
            
            IdsTributos['comercios'] =  (arrayComercios && arrayComercios.map((tributo) => {
                return {
                    representado: tributo.soyTitular ? null : tributo.titular.titular,
                    identificador: tributo.identificador
                }
            })) || [];

            IdsTributos['inmuebles'] =  (arrayInmuebles && arrayInmuebles.map((tributo) => {
                return {
                    representado: tributo.soyTitular ? null : tributo.titular.titular,
                    identificador: tributo.identificador
                }
            })) || [];

            IdsTributos['automotores'] =  (arrayAutomotores && arrayAutomotores.map((tributo) => {
                return {
                    representado: tributo.soyTitular ? null : tributo.titular.titular,
                    identificador: tributo.identificador
                }
            })) || [];
            
            return Object.assign({}, state.idsTributos, {
                idsTributos: IdsTributos
            });
        }
        default:
            return state;
    }
};
export default reducer;
