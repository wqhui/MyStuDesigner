/**
 * state的具体操作函数
 */

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
 * [根据页面id等属性设置state]
 * @param  {[type]} pageId       [description]
 * @param  {[type]} propertyPath [description]
 * @param  {[type]} value        [description]
 * @return {[type]}              [description]
 */
export const setDataProperty = (pageId, propertyPath, value) => state => {
	let propFullPath = ['page', pageId, 'data'].concat(propertyPath)
	return state.setIn(propFullPath, value)
}

/**
 * [根据页面id等属性获得state]
 * @param  {[type]} pageId       [description]
 * @param  {[type]} propertyPath [description]
 * @return {[type]}              [description]
 */
export const getDataProperty = (pageId, propertyPath) => state => {
	let propFullPath = ['page', pageId, 'data'].concat(propertyPath)
	return state.getIn(propFullPath)
}