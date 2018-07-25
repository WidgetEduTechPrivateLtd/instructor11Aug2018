var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/instructorRegis', function(req, res) {
  res.render('instructorRegis', {title: 'Instructor test'});
});

module.exports = router;
