import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Base from './views/base/Base';
import Resume from './views/resume/Resume';
import Home from './views/home/Home';
import './App.css';
import Contact from './views/contact/Contact';
import Footer from './views/footer/Footer';
import MusicPage from './views/music-page/MusicPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faBackward, faForward, faPeace } from '@fortawesome/free-solid-svg-icons';

// pre-load FontAwesome icons for use in project
library.add(faPlay, faPause, faBackward, faForward, faPeace);

class App extends Component {
  render() {
    return (
      <div class="expand">
        <BrowserRouter>
          <div class="page">
            <Route exact={true} path='/' render={() => (
              <div className="App">
                <Base lang="English"
                  content={ <Home /> } />
              </div>
            )}/>
            <Route exact={true} path='/resume' render={() => (
                <div className="App">
                  <Base lang="English"
                    content={ <Resume /> } />
                </div>
            )}/>
            <Route exact={true} path='/contact' render={() => (
                <div className="App">
                  <Base lang="English"
                    content={ <Contact /> } />
                </div>
            )}/>
            <Route exact={true} path='/music' render={() => (
                <div className="App">
                  <Base lang="English"
                    content={ <MusicPage /> } />
                </div>
            )}/>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
