// server.js

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const cors = require('cors');

const app = express();

app.use(session({ secret: 'your-secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const AUTHORIZATION_URL = 'https://example.com/oauth/authorize';
const TOKEN_URL = 'https://example.com/oauth/token';
const CALLBACK_URL = 'http://localhost:3001/auth/callback';

passport.use('oauth2', new OAuth2Strategy({
  authorizationURL: AUTHORIZATION_URL,
  tokenURL: TOKEN_URL,
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
  //use the access token to fetch user profile
  return cb(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth',
  passport.authenticate('oauth2'));

app.get('/auth/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('http://localhost:3000/');
  });

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
