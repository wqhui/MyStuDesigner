import componentFactory from '../componentFactory.js';
/**
 * 生成子控件
 * 
 * @param  {Immutable.List} children [子控件元数据List]
 * @param  {String} pageId   [pageId]
 * @param  {Immutable.Map} appState [appState]
 * @return {Array}          [子控件React Component]
 */
export function parseSubComponents(children = [], appState) {
	return children.map(item => {
		if(item.children){
			parseSubComponents(item.children,appState)
		}
		return componentFactory(appState,item.type);
	});
}