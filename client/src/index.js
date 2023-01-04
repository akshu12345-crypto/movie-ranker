import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

// import ReactDOM from 'react-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));

// ReactDOM.render(
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  // document.getElementById("root")
);
reportWebVitals();
