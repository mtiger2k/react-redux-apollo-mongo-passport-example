import express from 'express';
import passport from 'passport';
import jwt from 'jwt-simple'
import session from 'express-session';
import mongoose from 'mongoose';
var MongoStore = require('connect-mongo')(session);

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
}

export function setupLocalLogin(app) {

  mongoose.Promise = require('bluebird');
  //connect db
  mongoose.connect(process.env.MONGODB_URL);

  require('./config/passport')(passport);

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
       mongooseConnection:mongoose.connection
    }),
    cookie:{maxAge:180*60*1000}
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static('dist'));

  // sign up and sign in are handled by auth controller
  app.post('/signin', passport.authenticate('local-login'), (req, res)=>{
    res.send(tokenForUser(req.user));
  });

  app.post('/signup', passport.authenticate('local-signup'), (req, res)=>{
    res.send({id: req.user.id, username: req.user.username});
  });

  app.get('/user', (req, res)=>{
    if (req.user) {
        res.send({id: req.user._id, username: req.user.username});
    } else {
        res.send(null);
    }
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}