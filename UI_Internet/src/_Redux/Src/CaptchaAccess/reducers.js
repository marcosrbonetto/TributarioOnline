import {
    SET_ACCESS_CAPTCHA
} from "@ReduxSrc/CaptchaAccess/constants";

import storePersistent from "@Redux/Store/persistent";

let initialState = {
    accessCaptcha: undefined,
};

//Agrega al initialState lo que se seteo como permanente
initialState = storePersistent.getStorePersistent({
    reducer: 'CaptchaAccess',
    state: initialState
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCESS_CAPTCHA: {
            //Persiste los datos para que no se pierdan al actualizar la página
            return storePersistent.setStorePersistent({
                reducer: 'CaptchaAccess',
                state: state,
                sectionReducer: 'accessCaptcha',
                info: action.payload
            });
        }
        default:
            return state;
    }
};
export default reducer;
