import {
  // combineReducers,
  applyMiddleware,
  createStore,
  // getDefaultMiddleware,
  compose,
} from "@reduxjs/toolkit";
import { localStorage, thunk } from "./middleware";
import { rootReducer } from "./ducks";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage));
const reducer = rootReducer;

const store = createStore(reducer, enhancer);

export { store };
