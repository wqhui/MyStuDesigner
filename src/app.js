import React,{Fragment}  from 'react';
import {connect} from 'react-redux';
import {List,Map,fromJS,is} from 'immutable';

import FrameBox from './components/public/FrameBox.js';
import ChatBox from './components/chat/ChatBox.js';
import styles from './static/staticStyle.less';
import Popups from './components/popups/Popups.js';

class App extends React.Component{ 

 constructor (props) {
    super(props)   
  }

  shouldComponentUpdate(nextProps, nextState) {
      return true;
  }
  render(){
    return(
          <div className={styles["container"]}>    
              <FrameBox/>
              <ChatBox></ChatBox>
        
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

export default connect(mapStateToProps,mapDispatchToProps)(App);