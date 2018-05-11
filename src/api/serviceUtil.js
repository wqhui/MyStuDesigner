import { List, Map, fromJS, is } from 'immutable';
import {postApi} from './service.js';
import {eventBus} from '../util/eventBus.js';

const ROOT_URL = "http://localhost:8080/";

let tasks = List();

// setInterval(() => {
// 	if (tasks.size == 0)//没有任务就返回
// 		return;
// 	let noRunTasks = tasks.filterNot((_, pageId) => pageIsAjax(pageId))
// 	tasks = tasks.filter((_, pageId) => pageIsAjax(pageId))
// 	batchRun(noRunTasks);

// }, 10)

/**
 * [invokeService 暴露外部调用的接口]
 * @param  {[type]} urlPath [description]
 * @param  {[type]} data    [description]
 * @return {[type]}         [description]
 */
export function invokeService(requestMapping,methodName, data,mark='') {
	return batchRun(requestMapping,methodName, data,mark)
}

/**
 * [batchRun 真正的请求数据]
 * @return {[type]} [description]
 */
function batchRun(requestMapping,methodName, data,mark){
	let url = ROOT_URL + requestMapping+'/'+methodName;
	return postApi(url, data).then(data=>{
		eventBus.pub(requestMapping,methodName+mark,data)	
	}).catch(error => {
		eventBus.pub(requestMapping,methodName+mark,{pd:false})				
	});
}
