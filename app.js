var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
//Adding sessions plugin
var session = require('express-session');
//Index routing
var indexRouter = require('./routes/index');
// Adding Registration'
var registerRoute = require ('./routes/register');
// Adding Login
var loginRoute = require ('./routes/login');
//Adding the main-app
var mainappRoute = require('./routes/dashboard');
//Adding the Company Route
var companyDashboard = require('./routes/company');
// Requiring the Mongodb package
var mongoose = require('mongoose');


var app = express();


// Connecting to the database usign mongoose
mongoose.connect('mongodb://localhost/advocate');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Using sessions with a costume Secret key
app.use(session({secret:"ThisIsTopSecret",resave:false,saveUninitialized:true}));


app.use(express.static(path.join(__dirname, 'public')));
//Basic loading of the web page
app.use('/', indexRouter);
// Routers Created
app.use('/registration',registerRoute);
app.use('/login',loginRoute);
app.use('/dashboard',mainappRoute);


app.use('/company',companyDashboard);

// Handle the logout session part
app.use('/logout',(req,res,next)=>{
  req.session.destroy();
  res.redirect('/');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handling
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
