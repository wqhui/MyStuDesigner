import React,{Fragment}  from 'react';
import * as styles from './MessageBox.less'; 
import classnames from 'classnames';

class MessageBox extends React.Component{ 

 constructor (props) {
    super(props)   
  }

  shouldComponentUpdate(nextProps, nextState) {

  }

  renderPanel(props){
  	const { isLeft,content,isRecommend }=props;
  	let boxClassName= classnames({
			[styles["message-box"]]: true,
			[styles["main-flex-end"]]: !isLeft,		
	});
  	let angleClassNames = classnames({
			[styles["chat-bubble-angle"]]: true,	
			[styles["left-angle"]]: isLeft,
			[styles["right-angle"]]: !isLeft,	
	});
	return(

		<div className={boxClassName}>
			<div className={styles["chat-bubble"]}>
				{
					isRecommend?<MessageDetail content={content}/>
						:<span>{content}</span>
				}
				
				<span className={angleClassNames}></span>
			</div>					
		</div>
	)  	
  }

  render(){
    return this.renderPanel(this.props)
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

