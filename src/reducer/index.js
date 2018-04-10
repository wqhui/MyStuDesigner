import {Map} from 'immutable';
import * as names from '../action/actionnames.js';

let reducers = {};//reducer集合


let defaultReduce=(state=Map(),{type, param})=>{
	if(reducers[type]){
		let newstate=reducers[type](state,param);
		return newstate;
	}
	if(type!=names.DO_NOTHING && type!="@@redux/INIT")
		console.warn('not support reduce ',type);
	return state;
}

export default defaultReduce