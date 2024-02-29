const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const errorMiddleware = require("./middleware/error");
const logger = require('morgan');
const dotenv = require("dotenv");

dotenv.config()
const usersRouter = require('./routes/users');
const adminRouter = require("./routes/admin");
const indexRouter = require('./routes/index');
const connectDB = require("./database");
connectDB();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use("/admin",adminRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorMiddleware);

module.exports = app;
