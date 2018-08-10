var passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

passport.use(new FacebookStrategy({
  clientID: "213067342687869",
  clientSecret: "a76072eff637c73a49061d6cf",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({name: profile.displayName}, {name: profile.displayName, userid: profile.id, email: profile.email},
     function(err, user){
       if (err) {
         return done(err);
       }
       done(null, user);
     });
  }));

module.exports = passport;
