import { List, Map, fromJS, is } from 'immutable';
import {postApi} from './service.js';
import {eventBus} from '../util/eventBus.js';

const ROOT_URL = "http://localhost:8888/api/";

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
export function invokeService(methodName, data) {
	return batchRun(methodName, data)
}

/**
 * [batchRun 真正的请求数据]
 * @return {[type]} [description]
 */
function batchRun(methodName, data){
	let url = ROOT_URL + methodName;
	return postApi(url, data).then(data=>{
		eventBus.pub(methodName.split("/")[0],methodName,data)	
	})
}
