var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var expressValidator = require('express-validator');
var nodemailer = require('nodemailer');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'stmp.gmail.com',
  auth: {
    user: '',
    pass: ''
  }
});



var passportFacebook = require("./auth/facebook");
var passportTwitter = require("./auth/twitter");
var passportGoogle = require("./auth/google");


var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Setup mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://Zircoz:z1rPass@ds247061.mlab.com:47061/instructor';
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log('Database connected')).catch(err => console.log('Database connection error: ${err.message}'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

//Config body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  secret: 'qwertyuiop1234567890987654321poiuytrewq',
  store: new MongoStore({ mongooseConnection: mongoose.connection, touchAfter: 24 * 3600 }),
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*15}
}));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));


app.use('/node_modules', express.static(__dirname + '/node_modules'));

//for protecting instructor space
var instructor = require("./models/instructorData.js");

function checkUserType (req, res) {
  if (req.user.userType === 'instructor') {
    var approval = instructor.find({email: req.user.email});
    if (approval == true){
      return true;
    } else {
      return false;
    }
  };
};

function checkAuthentication(req, res, next){
  if(req.isAuthenticated() && checkUserType()) {
    next();
  } else {
    res.redirect('/login');
  }
};



app.use('/', indexRouter);
app.use('/instructor', checkAuthentication, usersRouter);
app.use('/auth', authRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
