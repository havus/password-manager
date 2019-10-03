import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './scenes/Home/';
import About from './scenes/About/';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={_ => {
          return <Redirect to="/home" />
        }} />
        <Route path='/home' component={Home} />
        <Route path='/about' component={About} />
      </Router>
    );
  }
}

export default App;
