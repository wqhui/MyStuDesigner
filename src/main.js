//main.js
import React,{Fragment} from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter,Route,Link,Redirect } from 'react-router-dom';
import {Provider} from 'react-redux';

import App from './app.js';
import Store from './Store.js';
import defAppState from './defAppState.js';
import {browserView} from './util/BrowserJudge.js';
import {initialComponents} from './componentFactory.js';
import * as components from './components';

console.log(browserView());

initialComponents(components);

defAppState.dispatch = Store.dispatch;

ReactDom.render(
	<Provider store={Store}>
		<App></App> 
	</Provider>,
    document.getElementById('content')
);

		// <BrowserRouter>
		// 	<Fragment>
		//         <Route exact  path="/" render={()=>   
		//           <Redirect to="/lawliet"/>                                       
		//         }/>
		//         <Route path="/lawliet" component={App}/>   
	 //        </Fragment>                      
	 //  	</BrowserRouter>  