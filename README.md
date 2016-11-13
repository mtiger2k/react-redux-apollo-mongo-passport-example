# react-redux-apollo-mongo-passport-example

[![npm version](https://badge.fury.io/js/react-apollo.svg)](https://badge.fury.io/js/react-apollo)
[![Get on Slack](https://img.shields.io/badge/slack-join-orange.svg)](http://www.apollostack.com/#slack)
[![Build Status](https://travis-ci.org/apollostack/react-apollo.svg?branch=master)](https://travis-ci.org/apollostack/react-apollo)

an example for universal react-redux apollo application, with mongo passport backend support.

## About

This is a starter boilerplate app I've put together using the following technologies:

* ~~Isomorphic~~ [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) rendering
* Both client and server make calls to load data from separate API server
* [React](https://github.com/facebook/react)
* [React Router](https://github.com/rackt/react-router)
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [React Router Redux](https://github.com/reactjs/react-router-redux) Redux/React Router bindings.
* [redux-form](https://github.com/erikras/redux-form) to manage form state in Redux
* [graphql](https://github.com/facebook/graphql) GraphQL is a query language and execution engine tied to any backend service. 
* [graphql-server-express](https://github.com/apollostack/graphql-server) GraphQL Server is a community-maintained open-source GraphQL server.
* [react-apollo](https://github.com/apollostack/react-apollo) Use your GraphQL server data in your React components, with the Apollo Client.
* [apollo-client](https://github.com/apollostack/apollo-client) Apollo Client can be used in any JavaScript frontend where you want to use data from a GraphQL server. 
* [Express](http://expressjs.com)
* [Mongoose](https://github.com/Automattic/mongoose)
* [passport](https://github.com/jaredhanson/passport)
* [passport-local](https://github.com/jaredhanson/passport-local)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs).
* [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader) and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css, sass and less,

### Installation

```bash
npm install
```

## Running Dev Server

```bash
npm run start-api
npm run dev
```

## Building and Running Production Server

```bash
npm run build
npm run start
```

---
Thanks for checking this out.

– Scott, Tian, [@mtiger2k]