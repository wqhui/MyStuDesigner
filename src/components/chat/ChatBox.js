import React,{Fragment}  from 'react';

import * as styles from './ChatBox.less'; 
import MessageBox from './MessageBox.js';

class ChatBox extends React.Component{ 

 constructor (props) {
    super(props)   
  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  renderPanel(){
	return(
		<div className={styles["chat-area"]}>
			<div className={styles["head-area"]}>
				<span className={styles["responced-wait-box"]}>正在码字回复中...</span>
				<img src="../../img/help.png" alt="帮助"/>
			</div>	
			<div className={styles["chat-list-box"]}>
				{ 
					msgList.map((item)=>{
						return	<MessageBox key={item.id} {...item}/>
					})
				}
			</div>
			<div className={styles["answer-area"]}>
				<input type="text"/>
				<img src="../../img/send.png" alt="发送"/>
			</div>				
		</div>
	)  	
  }

  render(){
    return this.renderPanel()
  }
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
	}
]