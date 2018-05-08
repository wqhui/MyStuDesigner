import getUUID from "./GetUUID.js";
//==消息相关处理
//
//


/**
 * @Author   Lawlite
 * @DateTime 2018-05-07
 * @param    {[type]}   content     [内容]
 * @param    {Boolean}  isLeft      [左侧右侧]
 * @param    {[type]}   messageType [ 0帮助信息 1用户发送 2标准查询回复 3其他回复]
 * @return   {[type]}               [description]
 */
export function constructMessageItem(content,isLeft=false,messageType=1){
	return{
		id:getUUID(),
		content:content,
		isLeft:isLeft,
		messageType:messageType
	}
}