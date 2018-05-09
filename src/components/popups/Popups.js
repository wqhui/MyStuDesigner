import React,{Fragment}  from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import classnames from "classnames";
import {fromJS,List,is} from "immutable";

import * as styles from './Popups.less'; 
import "../../font-awesome/css/font-awesome.css";
import {invokeService} from "../../api/serviceUtil.js";
import {eventBus} from '../../util/eventBus.js';
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
   	 	eventBus.sub("help","getHelpList",this.setHelpList)
   	 	this.state={
   	 		content:List([])
   	 	}   
  	}
	
  	shouldComponentUpdate(nextProps, nextState) {
  		let {content}=this.state;
  		let {isShow}=this.props;
  		if(!is(isShow,nextProps.isShow) || !is(nextState.content,content)){
  			return true;
  		}
  		return false;
  	}

  	componentWillReceiveProps(nextProps) {
  		// if(!is(nextProps,this.props)){//如果改变
  		// 	this.setState({
	   // 	 		isShow:nextProps.isShow.toJS().isShow
	   // 	 	})  
  		// }
  	}
	
	componentDidMount() {
		invokeService("help","getHelpList",{});
	}

	setHelpList=(data)=>{
		if(data.pd==true){
			this.setState({
				content:fromJS(data.result)
			})
		}else{
			this.setState({
				content:List([{helpTitle:'与服务器连接失败，请确定您已经联网',helpContent:''}])
			})
		}
	}

	closePopup=(ev)=>{
		this.props.closePopup()
		ev.preventDefault();//阻止默认提交
	}

	

  	renderPanel(){
  		
  		let widthStyle={
  			width:"0px"
  		}
		
		let isShow=this.props.isShow;
		let isShowJs=isShow.toJS().isShow;

  		if(isShowJs){
			widthStyle={width:"400px"}
		}

		let closeClassNames=classnames(
			[styles["pop-close"]],"fa","fa-times"
		)
		let popClassNames=classnames({
			[styles["pop-area"]]:true,
			[styles["help-area"]]:true,
			[styles["moveAnimation"]]:isShowJs,	
			[styles["leaveAnimation"]]:!isShowJs,						
		})
		let {content}=this.state;

		const {title,isPopup}=defaultProps;
		content = content.toJS();
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
									return <HelpMessageItem key={item.helpId || "item-null-zero"} {...item}/>				
							})	
					}						
				
				</div>	
			</div>
		)  	
  	}

  	render(){
    	return this.renderPanel()
	}
}

export default Popups;


				// {
				// 	isPopup?
				// 	<div className={styles["pop-btn-area"]}>
				// 		<a href="www.google.com" onClick={this.closePopup}>确定</a>
				// 		<a href="www.google.com" className={styles["cancel-btn"]} onClick={this.closePopup}>取消</a>					
				// 	</div>	
				// 	:""	
				// }

const HelpMessageItem=({helpTitle,helpContent})=>{
	return (
		<div className={styles["help-msg-box"]}>
			<div className={styles["help-msg-title"]}>{helpTitle}</div>
			<div className={styles["help-msg-content"]}>{helpContent}</div>
		</div>
	)
}

const defaultProps={
	position:"left",
	title:"帮助",
	content:[	
	],
	isPopup:false,
}


const defaultProps2={
	position:"left",
	title:"对话框",
	content:"聊天框帮助旁边就是反馈按钮哦",
	isPopup:true,
}