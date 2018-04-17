import React,{Fragment}  from 'react';

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
      this.props.submitQuestion(this.state.question)
    	this.setState({
    		question:""
    	})

  }

  renderPanel(){
	return(		
		<div className={styles["question-area"]}>
			<form onSubmit={this.submitQuestion}>
				<input type="text" onChange={this.inputChage} value={this.state.question}/>
				<img onClick={this.submitQuestion} src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1818142272,3128074207&fm=27&gp=0.jpg"/>
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