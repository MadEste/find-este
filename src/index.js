import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {firebaseAuth,admins} from './database';

/*
	TODO
			- change routing so it works with the browser too
			 - accomplish this by using session storage
	 		- ADD Delet with warning
		  - ADD MESSAGE ALERTS ex FOR bad url redirect!
		  - make some fields required on creation for project
*/

import App from './components/App';
import LogIn from './components/LogIn';
import Project from './components/Project';
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
			iVisit:true,
			canEdit:false
		}
	}
	componentWillMount(){
		//Session storage is synchronus so can be called before mount
		//User and can edit are based on session storage, iVisit saved to local storage
		let user = null;
		let canEdit = false;
		let iVisit = true;
		try{
			let jsonUser = sessionStorage.getItem('user');
			let jsonCanEdit = sessionStorage.getItem('canEdit');

			if(jsonUser !== null){
				user = JSON.parse(jsonUser);
			}
			if(jsonCanEdit !== null){
				canEdit = JSON.parse(jsonCanEdit);
			}
		}catch(err){console.log(err);}
		//Check Local Storage for inital visits
		try{
			let jsonVisited = localStorage.getItem('iVisit');
			if(jsonVisited !== null){
				//exists pull it into state
				iVisit = JSON.parse(jsonVisited);
			}
		}catch(err){console.log(err);}
		this.setState({user,iVisit,canEdit});
	}
	componentDidMount(){
		// eventListener to create auth listener and update state
		//firebase API is asynchronus so call after component mounted
		firebaseAuth().onAuthStateChanged( user => {
		  let canEdit = false;
		  //if logged in is admin then let edit otherwise dont.
		  if(user && admins.includes(user.uid) ){
		  	//update state to be editable
		  	canEdit = true;
		  }
		  //update localsession then update state
		  try{
		  	let jsonUser = JSON.stringify(user);
		  	sessionStorage.setItem('user',jsonUser);
		  	sessionStorage.setItem('canEdit',canEdit);
		  }catch(err){console.log(err);}
		  this.setState({user,canEdit});
		});
	}
	gitPopUp(history){
		let provider = new firebaseAuth.GithubAuthProvider();
		firebaseAuth().signInWithPopup(provider).then( (result) => {
			//Redirect to Root on login
		  history.push('/');
		}).catch( error => {
		  // Handle Errors here.
		  let errorCode = error.code;
		  let errorMessage = error.message;
		  console.log(errorCode+" , "+errorMessage);
		});
	}
	gitLogOut(history){
		firebaseAuth().signOut().then( () => {
		  // Sign-out successful.
		  // ADD REDIRECT
		  history.push('/');
		}).catch( error => {
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
								return(<ProjectFeed canEdit={this.state.canEdit}/>);
							}
						}}/>
						<Route exact path='/login' render={ ({history}) => {
							return <LogIn history={history} gitPopUp={this.gitPopUp} gitLogOut={this.gitLogOut} user={this.state.user}/>;
						}}/>
						<Route path='/projects/edit/:projectID' render={ props => {
							if(this.state.canEdit){
								return(<Project projectID={props.match.params.projectID} user={this.state.user} canEdit={this.state.canEdit} history={props.history}/>);
							}else{
								return(<Redirect to='/'/>);
							}
						}}/>
					</Switch>
				</App>
			</BrowserRouter>
		)
	}
}

ReactDOM.render(
	<Root/>,document.getElementById('root'))