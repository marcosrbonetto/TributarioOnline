import { createBrowserHistory } from "history";

import { applyMiddleware, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";

import rootReducer from "@Redux/Reducers/index";

export const history = createBrowserHistory({
  basename: window.Config.BASE_URL
});

const store = createStore(
  connectRouter(history)(rootReducer),
  {},
  compose(applyMiddleware(routerMiddleware(history)))
);

store.subscribe(() => {
  console.log(store.getState());
});
export default store;
