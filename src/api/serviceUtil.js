import { List, Map, fromJS, is } from 'immutable';
import {postApi} from './service.js'

const ROOT_URL = "";

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
export function invokeService(urlPath, data) {
	let url = ROOT_URL + urlPath;
	batchRun(url, data)
}

/**
 * [batchRun 真正的请求数据]
 * @return {[type]} [description]
 */
batchRun(url, data) {

	return postApi(url, data)
}
