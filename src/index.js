import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyD8AppmA_1x9EfaYCWFbgem5eZ0qMofweA",
    authDomain: "hackmit-2017-4d102.firebaseapp.com",
    databaseURL: "https://hackmit-2017-4d102.firebaseio.com",
    projectId: "hackmit-2017-4d102",
    storageBucket: "hackmit-2017-4d102.appspot.com",
    messagingSenderId: "212707144643"
  };
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
