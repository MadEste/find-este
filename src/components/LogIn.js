import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LogIn extends Component {
	constructor(props){
		super(props);
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

//proptype validation
LogIn.propTypes = {
	//custom user validator
	user: (props, propName, componentName) => {
	  const user = props[propName];
	  let error = null;
	  //User must be passed, even if it is null
	  if(typeof user === 'undefined'){
	    error = new Error('`' + componentName + '` prop `' +propName+ '` is Required.');
	  //user must be an object or null and cannot be an array
	  }else if(typeof user !== 'object' || Array.isArray(user)){
	    error = new Error('`' + componentName + '` prop `' +propName+ '` should be of type `Object`.');
	  }
	  return error;
	},
	//Login/Out functions passed
	gitPopUp: 	PropTypes.func.isRequired,
	gitLogOut: 	PropTypes.func.isRequired,
	history: 		PropTypes.object.isRequired
}

export default LogIn;
