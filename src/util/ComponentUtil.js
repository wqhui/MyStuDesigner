import componentFactory from '../componentFactory.js';
/**
 * 生成子控件
 * 
 * @param  {Immutable.List} children [子控件元数据List]
 * @param  {String} pageId   [pageId]
 * @param  {Immutable.Map} appState [appState]
 * @return {Array}          [子控件React Component]
 */
export function parseSubComponents(children = List(), appState) {
	return children.map(type => {
		return componentFactory(appState,type);
	});
}