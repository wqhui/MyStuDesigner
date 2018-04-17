import React,{Fragment}  from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import classnames from "classnames";
import {toJS,is} from "immutable";

import * as styles from './Popups.less'; 
import "../../font-awesome/css/font-awesome.css";

/**
 * @Author   Lawlite
 * @DateTime 2018-04-07
 * @param    {[type]}   props [description]
 * @param    {[type]}   nextState [description]
 * @return   {[type]}   jsx         [description]
 */
class Popups extends React.Component{ 

 	constructor (props) {
   	 	super(props);
   	 	this.state={
   	 		isShow:props.isShow?props.isShow.toJS().isShow:false
   	 	}   
  	}
	
  	shouldComponentUpdate(nextProps, nextState) {
  		if(this.state.isShow==nextState.isShow){
  			return false;
  		}
  		return true;
  	}

  	componentWillReceiveProps(nextProps) {
  		if(!is(nextProps,this.props)){//如果改变
  			this.setState({
	   	 		isShow:nextProps.isShow.toJS().isShow
	   	 	})  
  		}
  	}
	
	closePopup=(ev)=>{
		this.setState({
			isShow:false
		})
		ev.preventDefault();//阻止默认提交

	}

	showPopup=(ev)=>{
		this.setState({
			isShow:true
		})
		return false;
	}
	

  	renderPanel(){
  		let widthStyle={
  			width:"0px"
  		}

  		if(this.state.isShow){
			widthStyle={width:"400px"}
		}

		let closeClassNames=classnames(
			[styles["pop-close"]],"fa","fa-times"
		)
		let popClassNames=classnames({
			[styles["pop-area"]]:true,
			[styles["help-area"]]:!defaultProps.isPopup,
			[styles["moveAnimation"]]:this.state.isShow,	
			[styles["leaveAnimation"]]:!this.state.isShow,						
		})
		let isShow=this.state.isShow;
		const {title,content,isPopup}=defaultProps;
		return(
			<div  style={widthStyle} className={popClassNames} >
				
				<div className={styles["pop-header"]}>
					<span className={styles["pop-title"]}>{title}</span>
					<span className={closeClassNames} onClick={this.closePopup}></span>
				</div>		
				<div className={styles["pop-body"]}>
					{
						isPopup?<Fragment>{content}</Fragment>
							:content.map((item)=>{
									return <HelpMessageItem key={item.id} {...item}/>				
							})	
					}						
				
				</div>	
				{
					isPopup?
					<div className={styles["pop-btn-area"]}>
						<a href="www.google.com" onClick={this.closePopup}>确定</a>
						<a href="www.google.com" className={styles["cancel-btn"]} onClick={this.closePopup}>取消</a>					
					</div>	
					:""	
				}
			</div>
		)  	
  	}

  	render(){
    	return this.renderPanel()
	}
}

export default Popups;


const HelpMessageItem=({questionName,helpMessage})=>{
	return (
		<div className={styles["help-msg-box"]}>
			<div className={styles["help-msg-title"]}>{questionName}</div>
			<div className={styles["help-msg-content"]}>{helpMessage}</div>
		</div>
	)
}

const defaultProps={
	position:"left",
	title:"帮助",
	content:[
		{
			id:110676,
			questionName:"怎么使用？",
			helpMessage:"你可以这样说：“2000元手机”"
		},
		{
			id:11224667,
			questionName:"如何反馈？",
			helpMessage:"聊天框帮助旁边就是反馈按钮哦聊天框帮助旁边就是反馈按钮哦聊天框帮助旁边就是反馈按钮哦聊天框帮助旁边就是反馈按钮哦"
		}		
	],
	isPopup:false,
}


const defaultProps2={
	position:"left",
	title:"对话框",
	content:"聊天框帮助旁边就是反馈按钮哦",
	isPopup:true,
}