import { MAIN_CONTENT_CARGANDO } from "@Redux/Constants/index";

const initialState = {
  cargando: false,
  loggedUser: {},
  cantProcesosCargando: 0
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
        newState.cantProcesosCargando -=1;
        if(newState.cantProcesosCargando == 0)
          newState.cargando = cargar;
      }
        
      return newState;
    }
    default:
      return state;
  }
};
export default reducer;
