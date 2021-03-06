import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Firebase Auth
import { UserAuthContextProvider } from "./contexts/FirebaseContext";

//Routing
import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthContextProvider>
        <App />
      </UserAuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


