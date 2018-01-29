import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import database from './database';

import App from './components/App';
import ProjectFeed from './components/ProjectFeed';
import LogIn from './components/LogIn';

class Root extends React.Component{
	constructor(){
		super()
		//This binding is necesary to make `this` work
		//this.database = this.database.bind(this);
		this.state={}
	}
	render(){
		return(
			<BrowserRouter>
				<App>
					<Switch>
						<Route exact path='/' component={ProjectFeed}/>
						<Route exact path='/login' component={LogIn}/>
					</Switch>
				</App>
			</BrowserRouter>
		)
	}
}

ReactDOM.render(
	<Root/>,document.getElementById('root'))