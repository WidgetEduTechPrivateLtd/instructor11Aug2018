var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', ensureAuthenticated, function(req, res, next) {
  res.render('/instructorDashboard');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/loginInstructor')
};

router.get('/instructorRegisteration', function(req, res) {
  res.render('instructorRegis');
});

module.exports = router;
