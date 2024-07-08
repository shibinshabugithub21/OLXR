// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebaseContext } from './Store/FirebaseContext';
import Context from './Store/FirebaseContext'
import firebase from './firebase/config';

ReactDOM.render(
  <firebaseContext.Provider value={{ firebase }}>
    <Context>

    <App />
    </Context>
  </firebaseContext.Provider>,
  document.getElementById('root')
);
