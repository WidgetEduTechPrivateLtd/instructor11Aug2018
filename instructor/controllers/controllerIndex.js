var instructor = require("../models/instructorData.js")
var user = require('../models/User.js');
const nodemailer = require('nodemailer');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index_get = function (req, res) {
  res.render('index', { title: 'Instructor Module' });
};

exports.login_get = function(req, res) {
  res.render('login');
};

exports.login_post = function(req, res) {
  passport.authenticate('local', { successRedirect: '/instructor/dashboard', failureRedirect: '/login'});
};

exports.logout_get = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.register_get = function(req, res) {
  res.render('register');
};



exports.register_post = [

  //Validate fields.
  body('fullName').isLength({ min: 1}).trim().withMessage('Name must be specified').isAlphanumeric().withMessage('Name has non-Alphanumeric characters'),
  body('email').isLength({ min: 1}).trim().withMessage('E-mail must be specified').isEmail().withMessage('Must be a valid Email address'),
  body('MobileNumber').isMobilePhone().trim().withMessage('Mobile phone number must be valid'),
  body('pinCode').isPostalCode().trim().withMessage('Pin Code entered is not valid'),
  body('cv').isURL().trim().withMessage('URL entered is not valid'),
  body('TeachingExp').isNumeric({no_symbols: true}).trim().withMessage('Symbols like "+", "-", "." are not allowed.'),

  //Sanitize FIELDS
  sanitizeBody('fullName').trim().escape(),
  sanitizeBody('city').trim().escape(),
  sanitizeBody('state').trim().escape(),
  sanitizeBody('country').trim().escape(),
  sanitizeBody('TeachingExp').trim().escape(),
  sanitizeBody('cv').trim(),
  sanitizeBody('pinCode').trim(),





  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      //There are errors
      res.redirect('/register');
      return;
    }

    else {
      //Data is valid.

      var registerationEmail = {
        to: req.body.email,
        subject: 'Registeration Successful - WidgeTechEdu',
        text: 'Your registeration form for being an instructor has been submitted.\n You will recieve an email after we review you application.'
      };

      //Create a instructor object in db.
      var instructor = new instructor(
        {
          fullName: req.body.fullName,
          email: req.body.email,
          mobileNumber: req.body.mobileNumber,
          address: req.body.address,
          city: req.body.city,
          pinCode: req.body.pinCode,
          state: req.body.state,
          country: req.body.country,
          teachExp: req.body.teachExp,
          subjects: req.body.subjects,
          class: req.body.class,
          language: req.body.language,
          resume: req.body.resume,
          approval: false
        }
      );
      instructor.save(function(err) {
        if (err) { return next(err); }
        //Successful wala code.
        transporter.sendMail(registerationEmail, function(error, info){
          if (error) {
            res.redirect('/register');
          } else {
            res.redirect('/');
          }
        });
      }),

      User.findOneAndUpdate(
        {email: req.body.email},
        {new: true},
        function (err){
          if (err) {
            res.redirect('/register');
          } else {
            res.redirect('/');
          }
        }
      )
    }
}];

exports.dashboard_get = function(req, res) {
  res.render('dashboard');
};

exports.ping = function(req, res) {
  res.status(200).send("pong!");
};
