import React, { Component } from 'react';
import { Route, IndexRedirect } from 'react-router';
import { AppContainer } from 'react-hot-loader';

import App from '../views/App';
import Home from '../views/Home';
import Login from '../views/Login';
import {getCookie} from '../utils/index';

const validate = (next, replace, callback) => {
  const isLoggedIn = !!getCookie('adminToken')  //等效于var isLoggedIn = getCookie('adminToken') || false ;
  if (!isLoggedIn && next.location.pathname != '/login') {
    replace('/login')
  }
  callback()
}

const routes = (
  <Route path="/" onEnter={validate}>
      <IndexRedirect to="home" />
      <Route component={App}>
          <Route path="home" component={Home}/>
      </Route>
      <Route path="login" component={Login}/>
  </Route>
);

export default routes