import React, { Component } from 'react';
import { Route, IndexRedirect } from 'react-router';
import { AppContainer } from 'react-hot-loader';

import App from '../views/App';
import Home from '../views/Home';
import Login from '../views/Login';
import Page2 from '../views/Page2';
import Page3 from '../views/Page3/index';

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
          <Route path="page2" component={Page2}/>
          <Route path="page3" component={Page3}/>
      </Route>
      <Route path="login" component={Login}/>
  </Route>
);

export default routes