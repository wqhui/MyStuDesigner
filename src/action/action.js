/**
 * 公共部分的action以及对后台的请求
 */
import {invokeService} from '../api/serviceUtil.js';
// export function doAction(action,dispatch){
// 	let newState= mergeState(action,dispatch);
// 	// console.log('do action.',action.type,action);
// 	//在store刷新后,发出各种事件,避免读取脏数据
// 	setTimeout(()=>{
// 		pub_events(action);  
// 	},0)
// 	return newState;
// }
// 
export function doAction(action,dispatch){
	let newState=dispatch(action)
	return newState;
}

export let newAction=function(type, data){
	let param={data}
	return {type, param};
}


export function invokeRequst(methodName,args,dispatch=null){
	if(dispatch)
		return _invokeService(methodName,args,dispatch);
}

function _invokeService(methodName,args,dispatch){
	invokeService(methodName,args)
		.then(data=>{
			console.log(data)
			//doPostActions(data,dispatch);
		})
		.catch(e=>{
			//&& _.startsWith(e.message, 'dispose action')
			if(e.message ){
				return;
			}
			
		}
	);
}

