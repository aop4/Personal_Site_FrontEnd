import 'react-app-polyfill/ie9'; // polyfill app for IE 9 support
import 'ie-array-find-polyfill'; // polyfill for IE
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
