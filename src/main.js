//main.js
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter,Route,Link } from 'react-router-dom';
import {Provider} from 'react-redux';

import Question from './Question.js'

ReactDom.render(
	<Provider>
		<Question getState={store.getState}></Question>
	</Provider>,
    document.getElementById('content')
);
