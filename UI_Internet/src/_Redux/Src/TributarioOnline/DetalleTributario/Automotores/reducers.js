import { GET_CONCEPTOS_TRIBUTO } from "@ReduxTributarioOnline/DetalleTributario/Automotores/constants";

import fetch from 'cross-fetch'

const initialState = {
    GET_CONCEPTOS_TRIBUTO: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONCEPTOS_TRIBUTO: {
            return state;
        }
        default:
            return state;
    }
};
export default reducer;
