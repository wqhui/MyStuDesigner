import React,{Fragment}  from 'react';
import classnames from "classnames";

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
   	 		isShow:true
   	 	}   
  	}
	
  	shouldComponentUpdate(nextProps, nextState) {
  		return true;
  	}
	
	closePopup=(ev)=>{
		this.setState({
			isShow:false
		})
		ev.preventDefault();//阻止默认提交

	}

	showPopup(){
		return false;
	}
	
	getHelpList(){
		return <div></div>
	}

  	renderPanel(){
		let closeClassNames=classnames(
			[styles["pop-close"]],"fa","fa-times"
		)
		let popClassNames=classnames({
			[styles["pop-area"]]:true,
			[styles["help-area"]]:!defaultProps.isPopup
		}
		)
		let isShow=this.state.isShow;
		if(!isShow){
			return <div></div>
		}
		return(

			<div className={popClassNames}>
				<div className={styles["pop-header"]}>
					<span className={styles["pop-title"]}>{defaultProps.title}</span>
					<span className={closeClassNames} onClick={this.closePopup}>X</span>
				</div>		
				<div className={styles["pop-body"]}>
					{defaultProps.content}	
				</div>	
				{
					defaultProps.isPopup?
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


const defaultProps={
	position:"left",
	title:"我不是标题",
	content:"我也不是内容",
	isPopup:false
}