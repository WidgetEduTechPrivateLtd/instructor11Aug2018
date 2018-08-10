var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: "677550654286-o1e0d2r4g6kvkkmronnqdfm640bjr2a9.apps.googleusercontent.com",
  clientSecret: "aJ34CXJrn2gqdaz96m-7qYC0",
  callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ userid: profile.id }, { name: profile.displayName, userid: profile.id, email: profile.email }, function (err, user) {
    return done(err, user);
  });
}));

module.exports = passport ;
