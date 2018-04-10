import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import loggerMiddleware from './middle/loggerMiddleware.js';
import defaultReduce from './reducer/';



const reducer=defaultReduce;

let middleware = [thunk,loggerMiddleware];

export default createStore(reducer,applyMiddleware(...middleware));