import React,{Fragment}  from 'react';
import classnames from "classnames";
import {Map} from "immutable";

import * as styles from './Header.less';
import Popups from '../popups/Popups.js';
             

class Header extends React.Component{ 

	constructor(props) {
		super(props);
		this.state = {
			isReply: true,//是否正在回复
			isShow:Map({isShow:false})//显示帮助
		}

	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	showHelpBox=()=>{
		this.setState({
			isShow:Map({isShow:true})
		})		
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
					<span className={styles["responced-wait-box"]}>	
						{
							isReply?"正在码字回复中...":""
						}
					</span>							
					<div onClick={this.showHelpBox} className={helpIconClassName}></div>
					 <Popups isShow={this.state.isShow}></Popups> 
				</div>
		)  	
	}

	render(){
	    return this.renderPanel()
	}
}

export default Header;
