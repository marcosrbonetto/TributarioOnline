import { MAIN_CONTENT_CARGANDO, LOGIN_USER } from "@Redux/Constants/index";

const initialState = {
  cargando: false,
  loggedUser: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_CONTENT_CARGANDO: {
      return { ...state, cargando: action.payload };
    }
    case LOGIN_USER: {
      let loggedUser = {...state.loggedUser};

      if(action.payload.token)
        loggedUser['token'] = action.payload.token;
      if(action.payload.datos)
        loggedUser['datos'] = action.payload.datos;

      return {...state, loggedUser: loggedUser}
    }
    default:
      return state;
  }
};
export default reducer;
