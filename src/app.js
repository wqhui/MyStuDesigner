import React,{Fragment}  from 'react';
import {connect} from 'react-redux';
import {List,Map,fromJS,is} from 'immutable';

import FrameBox from './components/public/FrameBox.js';
import ChatBox from './components/chat/ChatBox.js';
import styles from './static/staticStyle.less';
import Popups from './components/popups/Popups.js';
import {parseSubComponents} from './util/ComponentUtil.js';


class App extends React.Component{ 

 constructor (props) {
    super(props);
    this.childrenContent=parseSubComponents([{type:"frameBox"},{type:"chatBox"}]);   
  }

  shouldComponentUpdate(nextProps, nextState) {
      return true;    
  }
  render(){
    const {appState,dispatch}=this.props;
  
    //console.log(componentFactory(Map(),appState,"chatBox"));
    return(
          <div className={styles["container"]}>    
              {this.childrenContent}        
          </div>
    )
  }
}


const mapStateToProps=(state,oweProps)=>{
    return {
      appState: state
    }
}

const mapDispatchToProps=(dispatch,oweProps)=>{
    return{
        dispatch:dispatch
    }
}

export default connect()(App);


const Bill =()=>{
  
}