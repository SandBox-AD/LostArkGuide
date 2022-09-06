var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
// const swaggerUi = require('swagger-ui-express')
// const swaggerJsdoc = require('swagger-jsdoc');
// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Api LostArk',
//       version: '1.0.0',
//       description: 'This is a REST API application made with Express.',
//     },
//   },
//   servers: [
//     {
//       url: 'http://localhost:3000',
//       description: 'Development server',
//     },
//   ],
//   apis: ['./routes/*.js']
// }
// const swaggerSpec = swaggerJsdoc(options);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var APIDemoniste = require('./routes/API_Demoniste');

var app = express();
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(connectLiveReload());

app.use('/', indexRouter);
// app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/API/Demoniste', APIDemoniste);

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
});

module.exports = app;
