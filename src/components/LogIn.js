import React, { Component } from 'react';

class LogIn extends Component {
	constructor(){
		super();
		this.logIn = this.logIn.bind(this);
		this.logOut = this.logOut.bind(this);
	}
	logIn(e){
		e.preventDefault();//stop default button code
		this.props.gitPopUp(this.props.history);//pass history prop
	}
	logOut(e){
		e.preventDefault();//stop default button code
		this.props.gitLogOut(this.props.history);//pass history prop
	}
  render() {
  	console.log(this.props);
  	//have if statement to display different layouts dependong on state of user
  	if(this.props.user){
  		//user is logged in
  		return(
				<div>
					<h2>{this.props.user.displayName} is logged in.</h2>
					<button onClick={this.logOut}>
		        Log Out
		      </button>
				</div>
  		);
  	}else{
  		//No one is logged in.
	    return(
	    	<div>
		      <h2>Log In Please</h2>
		      <button onClick={this.logIn}>
		        Log In
		      </button>
		  	</div>
	    );
  	}
  }
}

export default LogIn;
