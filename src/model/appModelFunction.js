import {List} from 'immutable';
/**
 * state的具体操作函数
 */
import {regReducer} from '../reducer/'
/**
 * [convertActionReduce 对不使用]
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function convertActionReduce(state, action) {
	return action(state)
}
regReducer('convert_appmodelfunction', convertActionReduce)

/**
 * [convertAppModelFunctionAction 转换 function=params=>state={} 到符合redux要求的action]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
export function convertAppModelFunctionAction(action) {
	return {
		type: 'convert_appmodelfunction',
		param: action
	}
}

/**
 * [新增或替换state]
 * @param  {[type]} pageId       [description]
 * @param  {[type]} propertyPath [description]
 * @param  {[type]} value        [description]
 * @return {[type]}              [description]
 */
export const setDataProperty = (propertyPath, value) => state => {
	let propFullPath = ['page', 'data'].concat(propertyPath);
	return state.setIn(propFullPath, value);
	
}

/**
 * [新增或替换state]
 * @param  {[type]} pageId       [description]
 * @param  {[type]} propertyPath [description]
 * @param  {[type]} value        [description]
 * @return {[type]}              [description]
 */
export const setListItem = (propertyPath, value) => state => {
	let propFullPath = ['page', 'data'].concat(propertyPath);
	let willState=state.getIn(propFullPath) 
	if(typeof willState != "undefined" && List.isList(willState)){
		return state.setIn(propFullPath, willState.push(value));
	}
	return state	
}

/**
 * [根获得state]
 * @param  {[type]} pageId       [description]
 * @param  {[type]} propertyPath [description]
 * @return {[type]}              [description]
 */
export const getDataProperty = (propertyPath) => state => {
	let propFullPath = ['page','data'].concat(propertyPath)
	return state.getIn(propFullPath)
}