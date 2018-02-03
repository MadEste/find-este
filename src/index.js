import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {firebaseAuth} from './database';

/*
	TODO
		- Start DEFINING PROPTYPES IN COMPONENTS
		 - define what is needed for Project model
		 - change what is viewed depending if logged in or not
		  - set fields for default template.
*/

import App from './components/App';
import LogIn from './components/LogIn';
import ProjectFeed from './components/ProjectFeed';
import Splash from './components/Splash';

class Root extends React.Component{
	constructor(){
		super()
		//This binding is necesary to make `this` work in the call back
		this.gitPopUp = this.gitPopUp.bind(this);
		this.gitLogOut = this.gitLogOut.bind(this);
		this.updateVisit = this.updateVisit.bind(this);
		this.state={
			user:null,
			iVisit:true
		}
	}
	componentWillMount(){
		// eventListener to create auth listener and update state
		firebaseAuth().onAuthStateChanged( user => {
		  this.setState({user});
		});
		//Check Local Storage for inital visits
		try{
			let jsonVisited = localStorage.getItem('iVisit');
			if(jsonVisited !== null){
				//exists pull it into state
				let iVisit = JSON.parse(jsonVisited);
				this.setState({iVisit});
			}
		}catch(err){
      console.log(err);
    }
	}
	gitPopUp(history){
		let provider = new firebaseAuth.GithubAuthProvider();
		firebaseAuth().signInWithPopup(provider).then( (result) => {
		  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
		  //var token = result.credential.accessToken;
		  // The signed-in user info.
		  //var user = result.user;
		  // ...ADD REDIRECT
		  history.push('/');
		}).catch( error => {
		  // Handle Errors here.
		  let errorCode = error.code;
		  let errorMessage = error.message;
		  // The email of the user's account used.
		  //var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  //var credential = error.credential;
		  // ...
		  console.log(errorCode+" , "+errorMessage);
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
	updateVisit(){
		//save to local storage in a try/catch Block
		try {
		  localStorage.setItem('iVisit', 'false');
		} catch (err) {
		  // Ignore write errors.
		  console.log(err);
		}
		//update state
		this.setState({
			iVisit:false
		});
	}
	render(){
		return(
			<BrowserRouter>
				<App>
					<Switch>
						<Route exact path='/' render={() => {
							if(this.state.iVisit){
								return(<Splash updateVisit={this.updateVisit}/>);
							}else{
								return(<ProjectFeed/>);
							}
						}}/>
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