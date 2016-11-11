'use strict';

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect';
import Posts from './posts';
import { fetchPostsIfNeeded } from '../actions';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    if (!getState().rootReducer.posts)
        return dispatch(fetchPostsIfNeeded());
    else
        return Promise.resolve();
  }
}])
@connect(
  state => ({
    receivePosts: {
      posts: state.rootReducer.posts,
      isFetching: state.rootReducer.isFetching,
      lastUpdated: state.rootReducer.lastUpdated
    }
  }))
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state={};
    this.state._activePost=-1;
  }

  handleClickCallback(i){
    this.setState({_activePost:i});
  }

  render() {
    const { posts, isFetching, lastUpdated } = this.props.receivePosts
    const { _activePost } = this.state;
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated)
                .toLocaleTimeString()}.
            </span>
          }
        </p>
        {posts && isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {posts && !isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts && posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} activePost={_activePost} 
              onClickHandler={this.handleClickCallback.bind(this)} />
          </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  receivePosts: React.PropTypes.shape({
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
  }),
}



