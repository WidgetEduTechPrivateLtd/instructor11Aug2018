var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* Render Dashboard. */
router.get('/dashboard', userController.dashboard );






module.exports = router;
