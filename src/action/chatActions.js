/**
 * 关于页面显示隐藏的有关action
 * export是与后台交互的逻辑
 * 非export为页面交互的逻辑
 */
import {regReducer} from "../reducer/index.js";
import * as names from './actionnames.js';
import {setDataProperty,getDataProperty,setListItem} from '../model/appModelFunction.js';
import * as action from './action.js';



export function invokeMethodOnly(methodName, args) {
	return (dispatch, getState) => {
		// let post=getPost(model.pageId)(getState());
		action.invokeRequst(methodName, args, dispatch);
	}
}
export function invokeDispatchOnly(type,data){
	return (dispatch, getState) => {
		action.doAction(type,data,dispatch)	
	}
}
export function getMsgList(){
	return (dispatch, getState) => {
		return getDataProperty("msgList")(getState());
	}	
}

export function addMsgItem(state,param){
	if(state){
		return setListItem("msgList",param.data)(state);
	}
	return (dispatch, getState) => {
		setListItem("msgList",param.data)(getState());
	}	
}
regReducer(names.ADD_MSG_ITEM,addMsgItem)