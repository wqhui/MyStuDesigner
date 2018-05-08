import React,{Fragment}  from 'react';
import {constructMessageItem} from '../../util/ChatMsgUtil.js';

import  * as styles  from './QuestionBox.less';

class QuestionBox extends React.Component{ 

    constructor (props) {
      super(props)

      this.state={
      	question:''
      } 
    }

    shouldComponentUpdate(nextProps, nextState) {
    	return true;
    }



    //输入改变
    inputChage=(ev)=>{
    this.setState({
    	question:ev.target.value
    })
    }

    //发送问题
    submitQuestion=(ev)=>{
      	ev.preventDefault();//阻止默认提交
        this.props.submitQuestion(constructMessageItem(this.state.question))
      	this.setState({
      		question:""
      	})

    }

    renderPanel(){
    return(		
    	<div className={styles["question-area"]}>
    		<form onSubmit={this.submitQuestion}>
    			<input type="text" onChange={this.inputChage} value={this.state.question} placeholder="输入..."/>
          <span className="fa fa-send" onClick={this.submitQuestion}></span>
    		</form>	
    	</div>				
    )  	
    }
    			// 
    render(){
      return this.renderPanel()
    }
}

export default QuestionBox;