var express = require('express');
var router = express.Router();
var indexController = require('../controllers/controllerIndex');

/* GET home page. */
router.get('/', indexController.index_get);

router.get('/login', indexController.login_get);

router.post('/login', indexController.login_post);

router.get('/register', indexController.register_get);

router.post('/register', indexController.register_post);

router.get('/logout', indexController.logout_get);

router.get('/ping', indexController.ping);

module.exports = router;
