import React,{Fragment}  from 'react';
import classnames from "classnames";
import {is,Map} from "immutable";

import * as styles from './Header.less';
import Popups from '../popups/Popups.js';
             

class Header extends React.Component{ 

	constructor(props) {
		super(props);
		this.state = {
			isShow:Map({isShow:false})//显示帮助
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {isShow}=this.state;
		const {isCallShow}=this.props;
		if(!is(isShow,nextState.isShow) || !is(isCallShow,nextProps.isCallShow) ){
			return true;
		}
		return false;
	}

	showHelpBox=()=>{
		this.setState({
			isShow:Map({isShow:true})
		})		
	}
	
	closeHelpBox=()=>{
		this.setState({
			isShow:Map({isShow:false})
		})		
	}

	componentDidMount() {
		this.setState({
			isShow:Map({isShow:false})
		})			
	}

	renderPanel=()=>{
	  	const {isCallShow}=this.props;
	  	let isCallShowJs=isCallShow.toJS().isCallShow;	  	
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
							isCallShowJs?"正在码字回复中...":""
						}
					</span>			
					<div className={classnames("fa","fa-trash",[styles["help-icon"]])}  title="清空聊天记录"></div>				
					<div onClick={this.showHelpBox} className={helpIconClassName}  title="帮助"></div>
					<Popups isShow={this.state.isShow} closePopup={this.closeHelpBox}></Popups> 
				</div>
		)  	
	}

	render(){
	    return this.renderPanel()
	}
}

export default Header;
