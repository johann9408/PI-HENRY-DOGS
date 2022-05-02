//import { createStore, applyMiddleware } from "redux";  // createStore sirve para la creacion del store, applyMid nos permite trabjar con acciones asincronicas
import { legacy_createStore as createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import rootReducer from "../reduce/reduce";


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));