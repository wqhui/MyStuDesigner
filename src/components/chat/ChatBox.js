import React,{Fragment}  from 'react';

import * as styles from './ChatBox.less'; 
import MessageBox from './MessageBox.js';
import QuestionBox from './QuestionBox.js';
import Header from './Header.js';
import * as chatAction from '../../action/chatActions.js';
import ScrollUtil from '../../util/ScrollUtil.js';

class ChatBox extends React.Component {

	constructor(props) {
		super(props)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	componentDidMount() {
		this.chatBoxDomToBottom()
	}

	chatBoxRef = (dom) => {
		if (dom != null) {
			this.scrollUtil = new ScrollUtil(dom);
		}

	}

	chatBoxDomToBottom=()=>{
		this.scrollUtil && this.scrollUtil.scrollBottomInit();
	}

	renderPanel(){
		return(
			<div className={styles["chat-area"]}>
				<Header></Header>		
				<div className={styles["chat-list-box"]} ref={this.chatBoxRef}>
					{ 
						msgList.map((item)=>{
							return	<MessageBox key={item.id} {...item}/>
						})
					}
				</div>
				<QuestionBox submitQuestion={this.props.submitQuestion}></QuestionBox>					
			</div>
		)  	
	}

	render(){
		console.log(this.props);
	    return this.renderPanel()
	}

	static actions={...chatAction}// 引入接口到this.props中
}

export default ChatBox;

let msgList=[
	{
		id:1,
		content:"如果不会查询可以点击右上角查看帮助哦~",
		isLeft:true,
		isRecommend:false,
	},{
		id:3,
		content:"2000元手机",
		isLeft:false,
		isRecommend:false,
	},{
		id:2,
		content:{
			phoneName:"小米6 4G运存版",
			advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
			disadvantage:"弱光条件下拍照成像素质较差"
		},
		isLeft:true,
		isRecommend:true,		
	},{
		id:4,
		content:"2000元手机",
		isLeft:false,
		isRecommend:false,
	},{
		id:5,
		content:{
			phoneName:"小米6 4G运存版",
			advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
			disadvantage:"弱光条件下拍照成像素质较差"
		},
		isLeft:true,
		isRecommend:true,		
	},{
		id:6,
		content:"2000元手机",
		isLeft:false,
		isRecommend:false,
	},{
		id:7,
		content:{
			phoneName:"小米6 4G运存版",
			advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
			disadvantage:"弱光条件下拍照成像素质较差"
		},
		isLeft:true,
		isRecommend:true,		
	},{
		id:8,
		content:"2000元手机",
		isLeft:false,
		isRecommend:false,
	},{
		id:9,
		content:{
			phoneName:"小米6 4G运存版",
			advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
			disadvantage:"弱光条件下拍照成像素质较差"
		},
		isLeft:true,
		isRecommend:true,		
	},{
		id:10,
		content:"2000元手机",
		isLeft:false,
		isRecommend:false,
	},{
		id:11,
		content:{
			phoneName:"小米6 4G运存版",
			advantage:"骁龙835强悍性能，四曲面玻璃设计，性价比极高的水桶机",
			disadvantage:"弱光条件下拍照成像素质较差"
		},
		isLeft:true,
		isRecommend:true,		
	}
]