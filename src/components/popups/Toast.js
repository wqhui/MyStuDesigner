import React,{Fragment}  from 'react';
import {Map,is} from 'immutable';

import * as styles from './Toast.less'; 

/**
 * Map({isShow:false,content:'',timeout:2000})
 * content 内容
 * timeout 消失秒
 * isShow  是否显示 
 */
class Toast extends React.Component {

	constructor(props) {
		super(props);
		let {isShow,content,timeout}=props.toastShow.toJS();
		this.state={
			isShow:Map({isShow:isShow}),
			content:isShow?Map({content:content}):Map({}),
			timeout:isShow?Map({timeout:timeout}):Map({})	
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		let {isShow,content,timeout}=this.state;
		if(!is(isShow,nextState.isShow) || !is(content,nextState.content) || !is(timeout,nextState.timeout)){
			return true;
		}
		return false;
	}

	componentWillReceiveProps(nextProps) {
		let {isShow,content,timeout}=nextProps.toastShow.toJS();
		if(isShow==true){//
			this.setState({
				isShow:Map({isShow:isShow}),
				content:Map({content:content}),
				timeout:Map({timeout:timeout})
			})
		}
	}
	
	isTimeout=()=>{
		let {timeout}=this.state.timeout;
		let timetoJS=3000;
		if((typeof timeout)!='undefined'){
			timetoJS=timeout.toJS().timeout;
			if((typeof timetoJS)!='number'){
				timetoJS=3000;
			}
		}	
		setTimeout(()=>{
			this.setState({
				isShow:Map({isShow:false})
			})
		},timetoJS)
	}

	componentDidMount() {
		let {isShow,content,timeout}=this.state;
		if(isShow.toJS().isShow==true){//显示土司
			this.isTimeout()
		}
	}
	
	renderPanel(){
		let {isShow,content,timeout}=this.state;
		if(isShow.toJS().isShow==true){//显示土司
			this.isTimeout();//倒数关闭土司
			return <div className={styles["error-msg"]}>{content.toJS().content}</div>
		}
		return '';
	}

	render(){
		return this.renderPanel(this.state)
	}
}

export default Toast;