import React from 'react';
import {db} from '../database';

class ProjectFeed extends React.Component{
	constructor(){
		super();
		this.state={
			projects:{}
		}
	}
	componentWillMount(){
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
	//make sure to always return only one root node
	//include a 'key' if using map to list mulitple items
	render(){
		let projects = this.state.projects;
		return(
			<div>
				<h1>This is the Project Feed</h1>
				<div className="projects">
				  {Object.keys(projects).map((key) => {
				    let project = projects[key]
				    return( 
				    	<div key={key}>
					      <h3>{project.title}</h3>
					      <p>{project.text}</p>
				      </div>
				    )
				  })}
				</div>
			</div>
		);
	}
}

export default ProjectFeed;