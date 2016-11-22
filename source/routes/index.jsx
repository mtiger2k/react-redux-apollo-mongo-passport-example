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
import { fetchUser } from '../shared/actions/user';

export default function getRoutes(onLogout, store) {

    const logout = (nextState, replace, cb) => {
        onLogout();
        replace('/');
        cb();
    };

    if (store) {//from client
        let token = localStorage.getItem('auth-token');
        if (token !== null) {
            store.dispatch(fetchUser());
        }
    }

    return (
        <Route path="/" name="Shared App" component={Layout} >
          <Route name="About" path="about" component={About} />
          <Route name="Calculator" path="calculator" component={Calculator} />
          <Route name="News" path="news" component={News} />
          <Route name="Test" path="test" component={privateRoute(Test)} />
          <Route name="Counter" path="counter" component={privateRoute(Counter)} />
          <Route name="Login" path="login" component={Login} />
          <Route name="Logout" path="logout" onEnter={logout} />
          <IndexRoute name="Welcome" component={App} />
          <Route path="*" name="Error" component={Error} />
        </Route>
    );
}