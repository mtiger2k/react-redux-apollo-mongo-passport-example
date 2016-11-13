import React, {Component} from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const PROFILE_QUERY = gql`
  query CurrentUserForLayout {
    currentUser {
      id
      username
    }
  }
`;

const currentUserData = graphql(PROFILE_QUERY, {
        options: { forceFetch: true },
        props: ({ data: { loading, currentUser } }) => ({
        loading, currentUser
    }),
})

@currentUserData
export default class Profile extends Component {

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