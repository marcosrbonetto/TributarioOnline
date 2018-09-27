import { GET_ID_TRIBUTOS } from "@ReduxTributarioOnline/constants";

const initialState = {
    GET_ID_TRIBUTOS: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ID_TRIBUTOS: {

            var IdsTributos =  action.payload.return.cuitRodados.map((identificador) => {
                return {
                    sistema: 'true',
                    identificador: identificador
                }
            });

            return Object.assign({}, state.GET_ID_TRIBUTOS, {
                GET_ID_TRIBUTOS: {
                    automotores: IdsTributos
                }
            });
        }
        default:
            return state;
    }
};
export default reducer;
