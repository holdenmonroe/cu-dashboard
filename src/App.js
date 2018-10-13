/**
 * Created by Zaedred on 9/6/2017.
 */
import React, { Component } from 'react';

//Components
import Header from './components/header';
import Home from './components/home';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/css/styles.css';
import './assets/css/bootstrap4-neon-glow.min.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header />
            <Home />
        </div>
    );
  }
}

export default App;