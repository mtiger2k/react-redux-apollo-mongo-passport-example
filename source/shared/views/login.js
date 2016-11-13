import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { browserHistory } from 'react-router';
import axios from 'axios'

import LoginForm from '../forms/loginForm'

const PROFILE_QUERY = gql`
  query CurrentUserForLogin {
    currentUser {
      id
      username
    }
  }
`;

const currentUserData = graphql(PROFILE_QUERY, {
        options: { forceFetch: true },
        props: ({ data: { loading, currentUser, updateQuery } }) => ({
        loading, currentUser, updateQuery,
    }),
});

@currentUserData
export default class Login extends Component {

    handleSubmit = (values, dispatch) => {
        let { updateQuery } = this.props;
        axios.post('/signin', values).then((response)=>{
            updateQuery((previousResult) => {
                return {currentUser: {id: response.data.id, username: response.data.username, __typename: "User"}};
            });
            browserHistory.push('/');
        });
    }

    render() {
        return (
            <LoginForm onSubmit={this.handleSubmit} />
        );
    }
}