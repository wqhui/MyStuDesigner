import {Map,List} from 'immutable';

const  defAppState = {
	clientinfo: {device:"web",useragent:"webkit", ip:"", width:1024, height:768, clientType:""},
	user: {logon:false,name:"",photo:"",token:"", locale:"zh_CN"},
	shareState: {},
	location:{details:{},time:'2018/01/01 12:03:09'},
};

export default defAppState;


const structure=Map({
	//聊天对话
	chatList:List([
		{
			id:1,
			content:"如果不会查询可以点击右上角查看帮助哦~",//内容
			isLeft:true,//聊天框左右
			messageType:0,//消息类型 0帮助信息 1用户发送 2标准查询回复 3其他回复
		},{
			id:3,
			content:"2000元手机",
			isLeft:false,
			isRecommend:false,
			messageType:1,
		},{
			id:2,
			content:{
				phoneName:"小米6 4G运存版",
				advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
				disadvantage:"弱光条件下拍照成像素质较差"
			},
			isLeft:true,
			messageType:2,//回复内容，2		
		}
	]),


})