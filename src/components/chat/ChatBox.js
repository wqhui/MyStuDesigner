import React,{Fragment}  from 'react';
import {Map,List,is} from 'immutable';

import * as styles from './ChatBox.less'; 
import MessageBox from './MessageBox.js';
import QuestionBox from './QuestionBox.js';
import Header from './Header.js';
import Toast from '../popups/Toast.js';

import '../../font-awesome/css/font-awesome.min.css';
import * as chatAction from '../../action/chatActions.js';
import ScrollUtil from '../../util/ScrollUtil.js';
import {constructMessageItem} from '../../util/ChatMsgUtil.js';

class ChatBox extends React.Component {

	constructor(props) {
		super(props);
		this.state={
			msgList:List([]),
			isCallShow:Map({isCallShow:false}),
			toastShow:Map({isShow:false})
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		let {msgList,isCallShow,toastShow}=this.state;
		if(!is(msgList,nextState.msgList) || !is(isCallShow,nextState.isCallShow) || !is(toastShow,nextState.toastShow)){
			return true;
		}
		return false;
	}

	componentDidMount() {
		this.setMsgList();
	}
	

	chatBoxRef = (dom) => {
		if (dom != null) {
			this.scrollUtil = new ScrollUtil(dom);
		}

	}
	
	componentDidUpdate(prevProps, prevState) {
		this.chatBoxDomToBottom()
	}

	setMsgList=()=>{
		let msgList=this.props.getMsgList();
		this.setState({
			msgList:msgList
		})
	}

	chatBoxDomToBottom=()=>{
		this.scrollUtil.scrollBottomInit();
	}

	addMsgItem=(value)=>{
		this.props.invokeDispatchOnly("addMsgItem",value);
		this.setMsgList();		
	}
	submitQuestion=(value)=>{
		if(this.state.isCallShow.toJS().isCallShow==false){
			this.setState({
				isCallShow:Map({isCallShow:true})
			})
		}
		this.addMsgItem(value);
	}
	callAnswer=(vl)=>{
		if(typeof vl !='undefined'){
			let value={};
			if((typeof vl)=="string"){
				value=constructMessageItem(vl,true,3);	
			}else{
				value=constructMessageItem(vl,true,2);	
			}
			this.addMsgItem(value);
		}	
		
		if(this.state.isCallShow.toJS().isCallShow==true){
			this.setState({
				isCallShow:Map({isCallShow:false})
			})
		}
	}

	showMsgErrTip=(_id)=>{
		this.setState({
			toastShow:Map({isShow:true,content:"消息发送失败，请重试",_id:_id}),
		})
	}

	renderPanel(){
		let {msgList,isCallShow,toastShow}=this.state;
		let msgListJs=msgList.toJS();
		return(
			<div className={styles["chat-area"]}>
				<Header isCallShow={isCallShow} ></Header>		
				<div className={styles["chat-list-box"]} ref={this.chatBoxRef}>
					{ 
						msgListJs.map((item)=>{
							return	<MessageBox callAnswer={this.callAnswer} showMsgErrTip={this.showMsgErrTip} key={item.id} {...item}/>
						})
					}
				</div>
				<Toast toastShow={toastShow}></Toast>
				<QuestionBox submitQuestion={this.submitQuestion}></QuestionBox>					
			</div>
		)  	
	}

	render(){
	    return this.renderPanel()
	}

	static actions={...chatAction}// 引入接口到this.props中
}

export default ChatBox;

let msgListTest=[
	// {
	// 	id:1,
	// 	content:"如果不会查询可以点击右上角查看帮助哦~",
	// 	isLeft:true,
	// 	isRecommend:false,
	// },{
	// 	id:3,
	// 	content:"2000元手机",
	// 	isLeft:false,
	// 	isRecommend:false,
	// },{
	// 	id:2,
	// 	content:{
	// 		phoneName:"小米6 4G运存版",
	// 		advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
	// 		disadvantage:"弱光条件下拍照成像素质较差"
	// 	},
	// 	isLeft:true,
	// 	isRecommend:true,		
	// },{
	// 	id:4,
	// 	content:"2000元手机",
	// 	isLeft:false,
	// 	isRecommend:false,
	// },{
	// 	id:5,
	// 	content:{
	// 		phoneName:"小米6 4G运存版",
	// 		advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
	// 		disadvantage:"弱光条件下拍照成像素质较差"
	// 	},
	// 	isLeft:true,
	// 	isRecommend:true,		
	// },{
	// 	id:6,
	// 	content:"2000元手机",
	// 	isLeft:false,
	// 	isRecommend:false,
	// },{
	// 	id:7,
	// 	content:{
	// 		phoneName:"小米6 4G运存版",
	// 		advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
	// 		disadvantage:"弱光条件下拍照成像素质较差"
	// 	},
	// 	isLeft:true,
	// 	isRecommend:true,		
	// },{
	// 	id:8,
	// 	content:"2000元手机",
	// 	isLeft:false,
	// 	isRecommend:false,
	// },{
	// 	id:9,
	// 	content:{
	// 		phoneName:"小米6 4G运存版",
	// 		advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
	// 		disadvantage:"弱光条件下拍照成像素质较差"
	// 	},
	// 	isLeft:true,
	// 	isRecommend:true,		
	// },{
	// 	id:10,
	// 	content:"2000元手机",
	// 	isLeft:false,
	// 	isRecommend:false,
	// },{
	// 	id:11,
	// 	content:{
	// 		phoneName:"小米6 4G运存版",
	// 		advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
	// 		disadvantage:"弱光条件下拍照成像素质较差"
	// 	},
	// 	isLeft:true,
	// 	isRecommend:true,		
	// }
]