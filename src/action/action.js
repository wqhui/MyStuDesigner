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

export function invokeRequst(args,post=null,dispatch=null){
	if(dispatch)
		return _invokeService(args,post,dispatch);
}

function _invokeService(args,post,dispatch){
	invokeService(args,post)
		.then(data=>{
			console.log(data)
			//doPostActions(data,dispatch);
		})
		.catch(e=>{
			if(e.message && _.startsWith(e.message, 'dispose action')){
				return;
			}
			
		}
	);
}

