import { MAIN_CONTENT_CARGANDO } from "@Redux/Constants/index";
import { SET_TIPO_TRIBUTOS } from "@Redux/Constants/index";

const initialState = {
  cargando: false,
  loggedUser: {},
  cantProcesosCargando: 0,
  idTipoTributos: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_CONTENT_CARGANDO: {
      let newState = {...state};

      const cargar = action.payload;
      if(cargar) {
        newState.cargando = cargar;
        newState.cantProcesosCargando += 1;
      } else {
        //Corroboramos que no exista procesos cargando
        if(newState.cantProcesosCargando > 0)
          newState.cantProcesosCargando -=1;
          
        if(newState.cantProcesosCargando == 0)
          newState.cargando = cargar;
      }
        
      return newState;
    }
    case SET_TIPO_TRIBUTOS: {
      return { ...state, idTipoTributos: action.payload };
    }
    default:
      return state;
  }
};
export default reducer;
