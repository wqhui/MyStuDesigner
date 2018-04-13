/**
 * 关于页面显示隐藏的有关action
 * export是与后台交互的逻辑
 * 非export为页面交互的逻辑
 */
import {regReducer} from "../reducer/index.js";
import * as names from '../action/actionnames.js';


function addMessage(state,param){
		
}
regReducer(names.ADD_MESSAGE,addMessage)