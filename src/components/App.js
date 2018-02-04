import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import {Switch} from 'react-router-dom';//needed for validation of child type

import './css/App.css';

import NavBar from './NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <div id="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

//proptype validation
App.propTypes = {
  //Custom validator for children so only a switch component is passed as a child
  children: (props, propName, componentName) => {
    const prop = props[propName];
    let error = null;
    //test if exists
    if(!prop){
      error = new Error('`' + componentName + '` must have prop:children.');
    //test if more than 1 child was passed
    }else if(prop.length>1){
      error = new Error('`' + componentName + '` must only be passed 1 child.');
    //test if child is a switch component
    }else if (prop.type !== Switch) {
      error = new Error('`' + componentName + '` prop `' +propName+ '` should be of type `Switch`.');
    }
    return error;
  }
}

export default App;
