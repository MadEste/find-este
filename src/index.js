import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import database from './database';

import App from './components/App';

class Root extends React.Component{
	constructor(){
		super()
		//This binding is necesary to make `this` work
		this.state={}
	}
	render(){
		return(
			<HashRouter>
				<App>
					<Switch>
					</Switch>
				</App>
			</HashRouter>
		)
	}
}

ReactDOM.render(
	<Root/>,document.getElementById('root'))