/**
 * 关于页面显示隐藏的有关action
 * export是与后台交互的逻辑
 * 非export为页面交互的逻辑
 */
import {regReducer} from "../reducer/index.js";
import * as names from './actionnames.js';
import {setDataProperty} from '../model/appModelFunction.js';
import * as action from './action.js';

export function submitQuestion(value){

}

export function invokeMethodOnly(methodName, args) {
	return (dispatch, getState) => {
		// let post=getPost(model.pageId)(getState());
		action.invokeRequst(methodName, args, dispatch);
	}
}

export function setQuestion(value){
	return (dispatch, getState) => {
		return setDataProperty("question",value)(getState());
	}		
}

regReducer(names.SET_QUESTION,setQuestion)