var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Connecting to MongoDB using Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = mongoose.Types.ObjectId;

var db = mongoose.connection;

db.on('connecting', function() {
    console.log('connecting to MongoDB...');
});

db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});
db.on('connected', function() {
    console.log('MongoDB connected!');
});
db.once('open', function() {
    console.log('MongoDB connection opened!');
});
db.on('reconnected', function() {
    console.log('MongoDB reconnected!');
});
db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
});
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

Task = require('./model/ToDoListTask');
User = require('./model/User');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var api = require('./routes/api');

HelperFunction = require('./service/helperFunction');
CreateResponseObj = require('./service/createResponseObj');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
