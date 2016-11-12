import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { browserHistory } from 'react-router';
import { push, replace } from 'react-router-redux'

import LoginForm from '../forms/loginForm'
import {loadAuth} from '../actions/auth'
import axios from 'axios'

@connect(
    state => ({
    }),
    {loadAuth})
export default class Login extends Component {

    handleSubmit = (values, dispatch) => {
        let { loadAuth } = this.props;
        axios.post('/signin', values).then((response)=>{
            browserHistory.push('/');
            dispatch(loadAuth);
        });
    }

    render() {
        return (
            <LoginForm onSubmit={this.handleSubmit} />
        );
    }
}