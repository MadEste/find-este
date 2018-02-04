import React from 'react';
import {db} from '../database';
import PropTypes from 'prop-types';

class Project extends React.Component{
	constructor(){
		super()
		//This binding is necesary to make `this` work in the call back
		this.state={
		}
	}
	componentWillMount(){
		console.log('will mount project');
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
	render(){
		return(
			<h1>{this.props.projectID}</h1>
		)
	}
}

//proptype validation
Project.propTypes = {
	//can Edit Proptype bool
	canEdit: PropTypes.bool.isRequired,
	projectID: PropTypes.string.isRequired
}

export default Project;