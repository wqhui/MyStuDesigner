import React,{Fragment}  from 'react';
import {connect} from 'react-redux';

import {List,Map,fromJS,is} from 'immutable';

class Question extends React.Component{ 

  shouldComponentUpdate(nextProps, nextState) {

  }
  render(){
    return(
          <Fragment>
            <div>hello</div>    
          </Fragment>
    )
  }
}


const mapStateToProps=(state,oweProps)=>{
    return {
     
    }
}

const mapDispatchToProps=(dispatch,oweProps)=>{

    return{
        dispatch:dispatch

    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Question);