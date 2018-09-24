import { USUARIO_LOGIN, USUARIO_CERRAR_SESION } from "@Redux/Constants/index";

const initialState = {
  usuario: undefined
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USUARIO_LOGIN: {
      sessionStorage.setItem("usuario", JSON.stringify(action.payload));
      return { ...state, usuario: action.payload };
    }
    case USUARIO_CERRAR_SESION: {
      sessionStorage.setItem("usuario", undefined);
      return { ...state, usuario: undefined };
    }
    default:
      return state;
  }
};
export default reducer;
