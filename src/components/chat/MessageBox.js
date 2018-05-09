import React,{Fragment}  from 'react';
import * as styles from './MessageBox.less'; 
import classnames from 'classnames';
import {Map,List,is} from 'immutable';

import {invokeService} from "../../api/serviceUtil.js";
import {eventBus} from '../../util/eventBus.js';

class MessageBox extends React.Component{ 

	constructor(props) {
		super(props);
		this.state={
			isPulse:Map({isPulse:props.messageType==1}),
			isError:Map({isError:false})
		}

	}

	shouldComponentUpdate(nextProps, nextState) {
		const {isPulse,isError}=this.state;
		if(!is(isPulse,nextState.isPulse) || !is(isError,nextState.isError)){
			return true;
		}
		return false;
	}



	componentDidMount() {
		const {isLeft,id,content} = this.props;
		if (isLeft == false) {
			eventBus.sub("chat", "question" + id, this.setMsgAnswer);
			invokeService("chat", "question", {question:content}, id);
		}

	}
	
	setMsgAnswer=(data)=>{
		const {id} = this.props;
		if(data.pd==true){
			this.props.callAnswer(data.result);
			this.setState({
				isPulse:Map({isPulse:false})
			})
		}else{
			this.setState({
				isPulse:Map({isPulse:false}),
				isError:Map({isError:true})
			})
			this.props.callAnswer();
			this.showMsgErrTip(id)
		}

	}

	showMsgErrTip=()=>{
		this.props.showMsgErrTip()
	}

	renderPanel(props,state) {
			const {
				isLeft,
				content,
				messageType,
				id
			} = props;
			const {isPulse,isError}=state;
			let isPulseJs=isPulse.toJS().isPulse;
			let isErrorJs=isError.toJS().isError;
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
			if(messageType==2){				
				content.map((item)=>{
					childrenContent.push(<MessageDetail key={item["phoneId"]+item["phoneName"]} content={item}/>)
				})
			}else{
				childrenContent=<span>{content}</span>;
			}
			return(

				<div className={boxClassName}>
					{isPulseJs?<div className={classnames(["fa fa-spinner fa-pulse",[styles["chat-bubble-icon"]]])}></div>
						:''
					}
					{isErrorJs==true?<div className={classnames(["fa fa-exclamation-circle",[styles["chat-bubble-icon"]],[styles["chat-bubble-icon-err"]]])} title="发送失败"></div>	
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

