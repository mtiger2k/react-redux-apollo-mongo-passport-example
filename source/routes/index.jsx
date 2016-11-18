import React from 'react';

import { Router, Route, IndexRoute } from 'react-router'
import App from '../shared/views/app';
import Error from '../shared/views/error';
import Layout from '../shared/views/layout';
import About from '../shared/views/about';
import Calculator from '../shared/views/calculator';
import News from '../shared/views/news';
import Test from '../shared/views/test';
import Counter from '../shared/views/counter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import privateRoute from './privateRoute';
import Login from '../shared/views/login';
import { fetchUser } from '../shared/actions/auth';

const routes= <Route path="/" name="Shared App" component={Layout} >
  <Route name="About" path="about" component={About} />
  <Route name="Calculator" path="calculator" component={Calculator} />
  <Route name="News" path="news" component={News} />
  <Route name="Test" path="test" component={privateRoute(Test)} />
  <Route name="Counter" path="counter" component={privateRoute(Counter)} />
  <Route name="Login" path="loginForm" component={Login} />
  <IndexRoute name="Welcome" component={App} />
  <Route path="*" name="Error" component={Error} />
</Route>

export default function getRoutes(store) {
    if (store) {//from client
        store.dispatch(fetchUser());
    }
    return routes;
}
