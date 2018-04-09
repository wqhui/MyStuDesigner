import React,{Fragment}  from 'react';

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

	renderPanel=()=>{
	  	const {isReply}=this.state;
		return(
				<div className={styles["head-area"]}>
					<span className={styles["logo"]}>Make By WqH</span>	
					{
						isReply?<span className={styles["responced-wait-box"]}>正在码字回复中...</span>
						:""
					}
					<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523275059409&di=a2ad7bc11a3416d1aa67950d6989d57c&imgtype=0&src=http%3A%2F%2F58pic.ooopic.com%2F58pic%2F14%2F78%2F30%2F42t58PICSm2.jpg" alt="帮助"/>
				</div>
		)  	
	}

	render(){
	    return this.renderPanel()
	}
}

export default Header;
