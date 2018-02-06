import React from 'react';
import {Link} from 'react-router-dom';
import {db, timeStamp} from '../database';
import PropTypes from 'prop-types';
//import firebase from "firebase";

import './css/Project.css'

class Project extends React.Component{
	constructor(props){
		super(props)
		//This binding is necesary to make `this` work in the call back
		this.handleChange = this.handleChange.bind(this);
		this.save = this.save.bind(this);
		this.state={
			title:'',
			text:'',
			mainImg:'',
			imgs:[],
			created:'',
			edited:'',
			author:''
		}
	}
	componentDidMount(){
		//check to see if not a new 
		if(this.props.canEdit && this.props.projectID!=='new'){
			//exists, pull fetch from database
			db.ref(`/projFeed/${this.props.projectID}`).once('value').then(snapshot=>{
				//call datasnapshot and pass into state.
				const data = snapshot.val();
				if(data !== null){
					//exists!
					this.setState(data);
				}else{
					//does not exist, redirect home
					this.props.history.push('/');
					//TODO ADD redirect message here
				}
      }).catch( error => {
      	console.log(error);
      })
		}
	}
		
	handleChange(e) {
		e.preventDefault();
		//updates state and form element, one function for all inputs using event target
    const value = e.target.value;
    const name = e.target.name;
    console.log([name]);
    this.setState({
      [name]: value
    });
  }
  save(e){
  	e.preventDefault();
  	//if it is new then push otherwise update
  	//use object spread to clone state
  	let cloneState = {...this.state};
  	if(this.props.projectID === 'new'){
  		//this is a new project, use push
  		cloneState.author = this.props.user.displayName;//add Author
  		db.ref('/projFeed/').push({...cloneState,'created':timeStamp}).then(ref=>{
  			this.props.history.push('/');
  		})
  	}else{
  		//already exists, update an old project.
  		db.ref(`/projFeed/${this.props.projectID}`).update({...cloneState,'edited':timeStamp}).then(()=>{
  			this.props.history.push('/');
  		});
  	}
  }
	render(){
		return (
		      <form>
		      	<h2>{this.props.projectID}</h2>
		        <label>
		          Title:
		          <input name='title' type='text' value={this.state.title} onChange={this.handleChange} />
		        </label>
		        <br />
		        <label>
		          Text:
		           <textarea name='text' value={this.state.text} onChange={this.handleChange} />
		        </label>
		        <br/>
		        <label>
		        	ImageURL:
		        	<input name='mainImg' type='text' value={this.state.mainImg} onChange={this.handleChange} />
		        </label>
		        <br/>
		        <button onClick={this.save}>Save</button>
		        <br/>
		        <Link to='/'>
		        	<button>Cancel</button>
		        </Link>
		      </form>

		    );
	}
}

//proptype validation
Project.propTypes = {
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
	//can Edit Proptype bool
	canEdit: PropTypes.bool.isRequired,
	projectID: PropTypes.string.isRequired,
	history: 		PropTypes.object.isRequired
}

export default Project;