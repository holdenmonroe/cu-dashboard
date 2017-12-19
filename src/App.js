/**
 * Created by Zaedred on 9/6/2017.
 */
import React, { Component } from 'react';

//Components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Home from './components/pages/home';

class App extends Component {
  render() {
    return (
        <div className="App">
            <Header />
              <Home />
            <Footer />
        </div>
    );
  }
}

export default App;