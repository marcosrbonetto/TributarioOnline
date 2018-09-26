import { GET_ID_TRIBUTOS } from "@ReduxTributarioOnline/constants";

const initialState = {
    GET_ID_TRIBUTOS: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ID_TRIBUTOS: {
            return Object.assign({}, state.GET_ID_TRIBUTOS, {
                GET_ID_TRIBUTOS: action.payload
            });
        }
        default:
            return state;
    }
};
export default reducer;
