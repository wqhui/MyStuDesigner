import React,{Fragment}  from 'react';
import classnames from "classnames";

import * as styles from './Header.less'; 



class Header extends React.Component{ 

	constructor(props) {
		super(props);
		this.state = {
			isReply: true//是否正在回复
		}
		setTimeout(()=>{
			this.testIsReply()
		},2000)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	testIsReply=() =>{
		this.setState({
			isReply:false
		})
	}

	getHelpBox=()=>{
		
	}

	renderPanel=()=>{
	  	const {isReply}=this.state;
	  	let helpIconClassName=classnames(
	  		"fa","fa-question-circle-o",[styles["help-icon"]]
	  	)
		return(
				<div className={styles["head-area"]}>
					<div className={styles["logo"]}>
						<div className="logo-icon"></div>
					</div>	
					{
						isReply?<span className={styles["responced-wait-box"]}>正在码字回复中...</span>
						:""
					}
					<span onClick={this.getHelpBox} className={helpIconClassName}></span>
				</div>
		)  	
	}

	render(){
	    return this.renderPanel()
	}
}

export default Header;
