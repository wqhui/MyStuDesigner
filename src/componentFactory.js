/**
 * 控件创建工厂类
 */
import React from 'react';
import {Map} from 'immutable';
import defAppState from './defAppState'
import * as actions from './action/action'

import {SET_ASYN_COMPONENT} from './action/actionnames';

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
const componentFactory = (meta=Map(), state, type, moreProps = {}) => {
	let componentType = type || meta.get('type');
	let component = components[componentType];
	let dispatch = defAppState.dispatch;
	if (component) {
		let allActions = createComponent(Object.assign({}, actions, component.actions),dispatch);	
		return React.createElement(component, {dispatch, ...moreProps, ...allActions});
	} else {
		// 判断是否属于异步加载的控件,得到加载状态(重量级控件)
		if (componentType === "LAZY") {
			if (process.env.NODE_ENV === 'production') {
				require.ensure(['../component/web/KDDesigner'], require=> {
					components[componentType] = require('../component/web/KDDesigner').default;
					// 修改shareState的值并刷新对应的表单
					if (components[componentType]) {
						dispatch({type: SET_ASYN_COMPONENT, param: {pageId: pageId}});
					}
				},'designer');
			}
		}else {
			console.log('can not find the react component of :' + componentType,'id',meta.get('id'));
			if (components['unknown'] && process.env.NODE_ENV !== 'production') {
				return React.createElement(components['unknown'], {type: componentType, key: meta.get('id') + '' + moreProps.key});
			}
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