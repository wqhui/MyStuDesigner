import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import loggerMiddleware from './middle/loggerMiddleware.js';



const reducer=(state=[],action)=>{
	return state;
};

let middleware = [thunk,loggerMiddleware];

export default createStore(reducer,applyMiddleware(...middleware));