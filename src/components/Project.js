import React from 'react';
import {db} from '../database';
import PropTypes from 'prop-types';

class Project extends React.Component{
	constructor(props){
		super(props)
		//This binding is necesary to make `this` work in the call back
		this.handleChange = this.handleChange.bind(this);
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
		console.log(this.props);
		//put code here to fetch from database
		db.ref('/projFeed').once('value').then(snapshot=>{
			//call datasnapshot and pass into state.
			let data = snapshot.val();
			this.setState({
        //update the state from the new array
        projects: data
      })
		})
	}
	handleChange(e) {
		//updates state and form element, one function for all inputs using event target
		console.log(e);
    const value = e.target.value;
    const name = e.target.name;
    console.log([name]);
    this.setState({
      [name]: value
    });
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
		        <button></button>
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
	projectID: PropTypes.string.isRequired
}

export default Project;