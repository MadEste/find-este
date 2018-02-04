import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Splash.css';

class Splash extends Component {
	constructor(){
		super();
		this.updateVisit = this.updateVisit.bind(this);
	}
	updateVisit(e){
		e.preventDefault();//stop default button code
		this.props.updateVisit();//update iVisit IndexState
	}
  render() {
  	//TODO Add links to images and src
  	return(
  	<div className="splashContainer">
  		<img className="img-left" src="" alt="Print and Video"/>
  		<div className="v1"></div>
  		<img className="img-right" src="" onClick={this.updateVisit} alt="Node and React"/>
  	</div>
  	);
  }
}

//proptype validation
Splash.propTypes = {
  //expects function
  updateVisit:   PropTypes.func.isRequired
}

export default Splash;
