import React, {Component} from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-connect';
import {loadAuth} from '../actions/auth'

@asyncConnect([{
 promise: ({ store: { dispatch, getState } }) => {
 if (!getState().auth.authenticated)
  return dispatch(loadAuth());
 else
  return Promise.resolve();
 }
 }])
@connect(
  state => ({
        currentUser: state.auth.currentUser,
        loading: state.auth.loading
    }),
    dispatch => ({loadAuth, dispatch})
)
export default class Profile extends Component {

    componentDidMount() {
        const { loadAuth, dispatch, currentUser } = this.props;
        if (!currentUser)
          dispatch(loadAuth())
    }

  render() {
    let { loading, currentUser } = this.props;
      if (loading) {
          return (
              <p className="navbar-text navbar-right">
              Loading...
              </p>
      );
      } else if (currentUser) {
          return (
              <span>
              <p className="navbar-text navbar-right">
              Logged as {currentUser.username}
      &nbsp;&nbsp;
      <a href="/logout">Log out</a>
          </p>
          </span>
      );
      }
      return (
          <p className="navbar-text navbar-right">
          <Link to="/loginForm">Log in</Link>
          </p>
  );
  }
}

Profile.propTypes = {
  loading: React.PropTypes.bool,
  currentUser: React.PropTypes.shape({
    username: React.PropTypes.string.isRequired,
  }),
};


