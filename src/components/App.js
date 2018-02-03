import React, { Component } from 'react';
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

export default App;
