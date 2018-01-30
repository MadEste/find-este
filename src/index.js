import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {db, firebaseAuth} from './database';


import App from './components/App';
import ProjectFeed from './components/ProjectFeed';
import LogIn from './components/LogIn';

class Root extends React.Component{
	constructor(){
		super()
		//This binding is necesary to make `this` work
		//this.database = database.bind(this);
		this.state={}
	}
	componentDidMount(){
		var provider = new firebaseAuth.GithubAuthProvider();
		firebaseAuth().signInWithPopup(provider).then(function(result) {
		  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
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