import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';

import NavBar from './Navbar';

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

export default App;
