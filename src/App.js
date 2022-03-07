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
import { faPlay, faPause, faBackward, faForward, faPeace, faExpandArrowsAlt,
  faChevronLeft, faChevronRight, faDownload, faCheck, faBabyCarriage, faBriefcase,
  faCalculator, faSeedling, faBrain, faMicroscope, faDesktop, faCodeBranch,
  faRocket, faCode, faMobileAlt, faMortarPestle, faMap, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import PhotographyPage from './views/photography/PhotographyPage';
import SoftwarePage from './views/software/SoftwarePage';
import BiographyPage from './views/biography/BiographyPage';

// pre-load FontAwesome icons for use in project
library.add(faPlay, faPause, faBackward, faForward, faPeace, faExpandArrowsAlt,
  faChevronLeft, faChevronRight, faDownload, faCheck, faBabyCarriage, faBriefcase,
  faCalculator, faSeedling, faBrain, faMicroscope, faCodeBranch, faDesktop,
  faRocket, faCode, faMobileAlt, faMortarPestle, faMap, faEllipsisV);

class App extends Component {

  render() {
    return (
      <div className="footer-pusher">
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
              <Route path='/biography/:lang(|es)?' render={() => (
                  <div className="App">
                    <Base content={ <BiographyPage /> } />
                  </div>
              )}/>
            </div>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
