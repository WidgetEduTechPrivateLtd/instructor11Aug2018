var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook');
var passportTwitter = require('../auth/twitter');
var passportGoogle = require('../auth/google');

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


router.get('/facebook', passportFacebook.authenticate('facebook'));
router.get('facebook/callback', passportFacebook.authenticate('facebook', { failureRedirect: "/loginInstructor"}),
function(req, res) {
  //Sucessful authentication.
  res.redirect('/dashboard');
});

router.get('/twitter', passportTwitter.authenticate('twitter'));

router.get('/twitter/callback', passportTwitter.authenticate('twitter', { failureRedirect: '/loginInstructor'}),
function(req, res) {
  //Successful authentication, redirect home
  res.redirect('/dashboard');
});

router.get('/google', passportGoogle.authenticate( 'google', { scope: 'https://www.google.com/m8/feeds'}));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

  module.exports = router;
