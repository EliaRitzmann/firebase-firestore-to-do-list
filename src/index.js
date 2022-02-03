import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Firebase Auth
import { UserAuthContextProvider } from "./contexts/FirebaseContext";

ReactDOM.render(
  <React.StrictMode>
    <UserAuthContextProvider>
        <App />
    </UserAuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


