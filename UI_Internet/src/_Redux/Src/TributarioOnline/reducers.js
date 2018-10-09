import { GET_ID_TRIBUTOS } from "@ReduxSrc/TributarioOnline/constants";

const initialState = {
    idsTributos: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ID_TRIBUTOS: {
            let IdsTributos = {}

            IdsTributos['comercios'] =  action.payload.return.cuitComercios.map((identificador) => {
                return {
                    sistema: 'true',
                    identificador: identificador
                }
            });

            IdsTributos['inmuebles'] =  action.payload.return.cuitInmuebles.map((identificador) => {
                return {
                    sistema: 'true',
                    identificador: identificador
                }
            });

            IdsTributos['juicios'] =  action.payload.return.cuitJuicios.map((identificador) => {
                return {
                    sistema: 'true',
                    identificador: identificador
                }
            });

            IdsTributos['planes'] =  action.payload.return.cuitPlanes.map((identificador) => {
                return {
                    sistema: 'true',
                    identificador: identificador
                }
            });

            IdsTributos['automotores'] =  action.payload.return.cuitRodados.map((identificador) => {
                return {
                    sistema: 'true',
                    identificador: identificador
                }
            });
            
            return Object.assign({}, state.idsTributos, {
                idsTributos: IdsTributos
            });
        }
        default:
            return state;
    }
};
export default reducer;
