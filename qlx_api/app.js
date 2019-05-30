var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var formidable = require('express-formidable'); //upload images

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Vehicle information
var vehicleDetailsRouter = require('./routes/vehicledetails');
//Vehicle rental history information
var vehiclerentalhistory = require('./routes/vehiclerentalhistory');
//Customer information
var customer = require('./routes/customer');
//Vehicle repair history information
var vehiclerepairhistory = require('./routes/vehiclerepairhistory');

//Rentaler infomation
var rentaler = require('./routes/rentaler');

var app = express();

var multer = require('multer')
var fileUpload = require('express-fileupload');
var cors = require('cors');
app.use(cors())
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.json()).use(express.urlencoded())

// app.use('/public', express.static(path.join(__dirname, 'public')));
// var staticResource='E:/PHUNG/qlx_api/public/images';
// app.use('/photo', express.static(path.join(staticResource, 'photo')));
//app.use(express.static('public'));
app.use('/photo', express.static(__dirname + '/photo/customer'));
//app.use('/vehicle', express.static(__dirname + '/photo/vehicle'));
app.use('/image',express.static(__dirname + '/photo'));
//app.use('/vehicle',express.static(__dirname + '/photo'))

 //app.use(formidable({uploadDir:'./photo/vehicle'}));//upload image


app.use('/', indexRouter);
app.use('/users', usersRouter);
//Vehicle information
app.use('/vehicledetails', vehicleDetailsRouter);
//Vehicle rental history information
app.use('/vehiclerentalhistory', vehiclerentalhistory);
//Customer information
app.use('/customer', customer);
//Vehicle repair history information
app.use('/vehiclerepairhistory', vehiclerepairhistory);

//Rentaler information
app.use('/rentaler', rentaler);

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

var server = app.listen(3333, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://%s:%s", host, port)
})
