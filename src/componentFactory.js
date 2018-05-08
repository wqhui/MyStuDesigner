/**
 * 控件创建工厂类
 */
import React from 'react';
import {Map} from 'immutable';
import defAppState from './defAppState'
import * as actions from './action/action'

import getUUID from './util/GetUUID.js';

// 控件集合
let components;

/**
 * 初始化控件集合
 */
export function initialComponents(deviceComponents) {
	components = deviceComponents;
}

/**
 * 组件创建工厂类
 * @param  {Immutable.Map} 		appState 顶层state
 * @param  {String} type   		控件类型(可选，如果未传则取meta.get('type'))
 * @return {React.Component} 	React.Component
 */
const componentFactory = (state, type, moreProps = {}) => {
	let componentType = type;
	let component = components[componentType];
	let dispatch = defAppState.dispatch;
	if (component && componentType !== "popup") {
		let allActions = createComponent(Object.assign({}, actions, component.actions),dispatch);	
		return React.createElement(component, {key:type+getUUID(),dispatch, ...moreProps, ...allActions});
	} else {
		// 判断是否属于异步加载的控件
		if (componentType === "popup") {
			require.ensure(['./components/popups/Popups.js'], require=> {
				components[componentType] = require('./components/popups/Popups.js').default;
			},'popup');
		}else {
			console.log('can not find the react component of :' + componentType,'id',meta.get('id'));
			// if (components['unknown'] && process.env.NODE_ENV !== 'production') {
			// 	return React.createElement(components['unknown'], {type: componentType, key: meta.get('id') + '' + moreProps.key});
			// }
		}
		return <LazyComponent componentType={componentType} />
	}
}
const LazyComponent=(props)=>{
	console.log('lazy load :',props.componentType);
	return <div/>
}


function createComponent(allActions,dispatch){
	// 将原数据操作/服务映射到方法
	let actionCreator = {};
	for(let prop in allActions){
		let action=allActions[prop];
		actionCreator[prop] = (...args) => {
			return dispatch(action(...args));
		}

	}
	return actionCreator;
}

export default componentFactory;