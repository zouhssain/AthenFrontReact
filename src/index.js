import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
console.clear();

  const loginBtn = document.getElementById('login');
  const signupBtn = document.getElementById('signup');

  loginBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
      if(element !== "slide-up") {
        parent.classList.add('slide-up')
      }else{
        signupBtn.parentNode.classList.add('slide-up')
        parent.classList.remove('slide-up')
      }
    });
  });

  signupBtn.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
      if(element !== "slide-up") {
        parent.classList.add('slide-up')
      }else{
        loginBtn.parentNode.parentNode.classList.add('slide-up')
        parent.classList.remove('slide-up')
      }
    });
  });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
