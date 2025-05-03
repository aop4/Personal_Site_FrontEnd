import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Base from './views/base/Base';
import Resume from './views/resume/Resume';
import Home from './views/home/Home';
import './App.css';
import Contact from './views/contact/Contact';
import Footer from './views/footer/Footer';
import MusicPage from './views/music-page/MusicPage';
import PhotographyPage from './views/photography/PhotographyPage';
import BiographyPage from './views/biography/BiographyPage';
import PageNotFound from './views/page-not-found/PageNotFound';
import BlogMainPage from './views/blog/blog-main-page/BlogMainPage';
import BlogPost from './views/blog/blog-post/BlogPost';

class App extends Component {

  render() {
    return (
      <div className="footer-pusher">
        <div className="expand">
          <BrowserRouter>
            <div className="site-page">
              <Switch>
                <Route path='/:lang(|es)' render={() => (
                  <div className="App">
                    <Base lang="English"
                      content={ <Home /> } />
                  </div>
                )}/>
                <Route path='/resume/:lang(|es)?' render={() => (
                    <div className="App">
                      <Base content={ <Resume /> } title="Resume" />
                    </div>
                )}/>
                <Route path='/contact/:lang(|es)?' render={() => (
                    <div className="App">
                      <Base content={ <Contact /> } title="Contact Me" />
                    </div>
                )}/>
                <Route path='/music/:lang(|es)?' render={() => (
                    <div className="App">
                      <Base content={ <MusicPage /> } title="Music" />
                    </div>
                )}/>
                <Route path='/photography/:lang(|es)?' render={() => (
                    <div className="App">
                      <Base content={ <PhotographyPage /> } title="Photography" />
                    </div>
                )}/>
                <Route path='/biography/:lang(|es)?' render={() => (
                    <div className="App">
                      <Base content={ <BiographyPage /> } title="Biography" />
                    </div>
                )}/>
                <Route path='/blog/all/:lang(|es)?' render={() => (
                    <div className="App">
                      <Base content={ <BlogMainPage /> } title="Blog" />
                    </div>
                )}/>
                <Route path='/blog/:path/:lang(|es)?' render={() => (
                    <div className="App">
                      <Base content={ <BlogPost /> } title="Blog" />
                    </div>
                )}/>
                <Route path='*' render={() => (
                  <div className="App">
                    <Base content={ <PageNotFound /> } />
                  </div>
                )}/>
              </Switch>
            </div>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
