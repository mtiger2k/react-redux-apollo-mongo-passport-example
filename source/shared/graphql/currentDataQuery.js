import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const LOAD_CURRENT_USER = gql`
  query CurrentUserForLayout {
    currentUser {
      id
      username
    }
  }
`;

const currentUserData = graphql(LOAD_CURRENT_USER, {
        options: { forceFetch: true },
        props: ({ data: { loading, currentUser, updateQuery } }) => ({
        loading, currentUser, updateQuery
    }),
})

export default currentUserData