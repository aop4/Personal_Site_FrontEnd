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
import { faPlay, faPause, faBackward, faForward, faPeace, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import PhotographyPage from './views/photography/PhotographyPage';
import SoftwarePage from './views/software/SoftwarePage';

// pre-load FontAwesome icons for use in project
library.add(faPlay, faPause, faBackward, faForward, faPeace, faExpandArrowsAlt);

class App extends Component {

  render() {
    return (
      <div className="expand">
        <BrowserRouter>
          <div className="site-page">
            <Route path='/:lang(|es)' render={() => (
              <div className="App">
                <Base lang="English"
                  content={ <Home /> } />
              </div>
            )}/>
            <Route path='/resume/:lang(|es)?' render={() => (
                <div className="App">
                  <Base content={ <Resume /> } />
                </div>
            )}/>
            <Route path='/contact/:lang(|es)?' render={() => (
                <div className="App">
                  <Base content={ <Contact /> } />
                </div>
            )}/>
            <Route path='/music/:lang(|es)?' render={() => (
                <div className="App">
                  <Base content={ <MusicPage /> } />
                </div>
            )}/>
            <Route path='/photography/:lang(|es)?' render={() => (
                <div className="App">
                  <Base content={ <PhotographyPage /> } />
                </div>
            )}/>
            <Route path='/software/:lang(|es)?' render={() => (
                <div className="App">
                  <Base content={ <SoftwarePage /> } />
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
