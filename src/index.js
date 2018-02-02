import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {db, firebaseAuth} from './database';

/*
	TODO
		 - setup redirect on gitPopUp and logout
		 - define what is needed for Project model
		 - change what is viewed depending if logged in or not
		  - set fields for default template.
*/

import App from './components/App';
import ProjectFeed from './components/ProjectFeed';
import LogIn from './components/LogIn';

class Root extends React.Component{
	constructor(){
		super()
		//This binding is necesary to make `this` work in the call back
		this.gitPopUp = this.gitPopUp.bind(this);
		this.gitLogOut = this.gitLogOut.bind(this);
		this.state={
			user:null
		}
	}
	componentWillMount(){
		// eventListener to create auth listener and update state
		firebaseAuth().onAuthStateChanged( user => {
		  this.setState({user});
		});
	}
	gitPopUp(history){
		let provider = new firebaseAuth.GithubAuthProvider();
		firebaseAuth().signInWithPopup(provider).then( (result) => {
		  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  // ...ADD REDIRECT
		  history.push('/');
		}).catch( error => {
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
	gitLogOut(history){
		firebaseAuth().signOut().then( () => {
		  // Sign-out successful.
		  // ADD REDIRECT
		  history.push('/');
		}).catch(function(error) {
		  // An error happened.
		  console.log(error);
		});
	}
	render(){
		return(
			<BrowserRouter>
				<App>
					<Switch>
						<Route exact path='/' component={ProjectFeed}/>
						<Route exact path='/login' render={ ({history}) => {
							return <LogIn history={history} gitPopUp={this.gitPopUp} gitLogOut={this.gitLogOut} user={this.state.user}/>;
						}}/>
					</Switch>
				</App>
			</BrowserRouter>
		)
	}
}

ReactDOM.render(
	<Root/>,document.getElementById('root'))