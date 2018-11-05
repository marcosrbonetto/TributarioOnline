import { createHashHistory } from "history";

import { applyMiddleware, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";

import rootReducer from "@Redux/Reducers/index";

export const history = createHashHistory({
  basename: ''
});

let appStore = {};
if(localStorage.getItem('appStore')) {
  try {
    appStore = JSON.parse(localStorage.getItem('appStore'));
  } catch(e) {
    console.log("[TO] Error al convertir el appStore a JSON")
  }
}

const store = createStore(
  connectRouter(history)(rootReducer),
  appStore,
  compose(applyMiddleware(routerMiddleware(history)))
);

store.subscribe(() => {
  localStorage.setItem('appStore', JSON.stringify(store.getState()));
  console.log(store.getState());
});
export default store;
