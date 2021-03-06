/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb


import React from 'react'
import { render } from 'react-dom';
import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'
import {HashRouter as Router, Route} from 'react-router-dom';
// import Login from '../components/Login';
import Registration from '../components/Registration';
import Recognition from '../components/Recognition';
import Mood from '../components/Mood';
import Home from '../components/Home';
import Speech from '../components/Speech';
import registerServiceWorker from './registerServiceWorker';


const Routes = (
  <Router>
  <div>
  <Route exact path="/" component={ Home } />
  <Route exact path="/register" component={ Registration } />
  <Route exact path="/recognize" component={ Recognition } />
  <Route exact path="/mood" component={ Mood } />
  <Route exact path="/speech" component={ Speech } />




  </div>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
    const container = document.body.appendChild(document.createElement('div'));
    render(Routes, container);
});
