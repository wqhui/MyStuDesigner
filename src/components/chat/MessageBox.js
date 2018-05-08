import React,{Fragment}  from 'react';
import * as styles from './MessageBox.less'; 
import classnames from 'classnames';

import {invokeService} from "../../api/serviceUtil.js";
import {eventBus} from '../../util/eventBus.js';

class MessageBox extends React.Component{ 

	constructor(props) {
		super(props);
		this.state={
			isPulse:props.messageType==1
		}

	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}



	componentDidMount() {
		const {isLeft,id,content} = this.props;
		if (isLeft == false) {
			eventBus.sub("chat", "question" + id, this.setMsgAnswer);
			invokeService("chat", "question", {question:content}, id);
		}

	}
	
	setMsgAnswer=(data)=>{
		this.setState({
			isPulse:false
		})
		if(data.pd==true){
			this.props.callAnswer(data.result);
		}else{
			this.setState({
				isError:true
			})
		}

	}

	renderPanel(props,state) {
			const {
				isLeft,
				content,
				messageType,
				id
			} = props;
			const {isPulse}=state;
			let boxClassName = classnames({
				[styles["message-box"]]: true,
				[styles["main-flex-end"]]: !isLeft,
			});
			let angleClassNames = classnames({
				[styles["chat-bubble-angle"]]: true,
				[styles["left-angle"]]: isLeft,
				[styles["right-angle"]]: !isLeft,
			});
			
			let childrenContent=[];
			console.log()
			if(messageType==2){				
				content.map((item)=>{
					childrenContent.push(<MessageDetail key={item["phoneId"]+item["phoneName"]} content={item}/>)
				})
			}else{
				childrenContent=<span>{content}</span>;
			}

			return(

				<div className={boxClassName}>
					{isPulse?<div className={classnames(["fa fa-spinner fa-pulse",[styles["chat-bubble-icon"]]])}></div>
						:''
					}
					<div className={styles["chat-bubble"]}>
						{childrenContent}						
						<span className={angleClassNames}></span>
					</div>	

				</div>
			)  	
	}
	render() {
		return this.renderPanel(this.props,this.state)
	}
}

let MessageDetail=({content})=>{
	const {phoneName,advantage,disadvantage}=content;
	return (
		<div className={styles["phone-recommend"]}>
			<div className={styles["phone-name"]}>{phoneName}</div>
			<div className={styles["phone-character"]}>【优势：{advantage}】</div>
			<div className={styles["phone-character"]}>【劣势：{disadvantage}】</div>
		</div>
	)
}

export default MessageBox;

