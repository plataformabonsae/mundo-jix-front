import {
  // combineReducers,
  applyMiddleware,
  createStore,
  // getDefaultMiddleware,
  compose,
} from "@reduxjs/toolkit";
import { localStorage, thunk } from "./middleware";
import { ducks } from "./ducks";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, localStorage));
const reducer = ducks;

const store = createStore(reducer, enhancer);

export { store };
