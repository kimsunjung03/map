const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const request = require('request');
const conver = require('xml-js');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

var HOST = 'http://openapi.data.go.kr/openapi/service/rest';
var SERVICE_KEY = 'uCW0%2F%2F3vtXFmlAAId54uHKiR75i6%2Fp%2FuRlosel9n3TRReR6IyvTdvrODwIila%2F%2B%2FnFSFWffI49O6W%2BtZQ%2B8inw%3D%3D';

/* 
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=uCW0%2F%2F3vtXFmlAAId54uHKiR75i6%2Fp%2FuRlosel9n3TRReR6IyvTdvrODwIila%2F%2B%2FnFSFWffI49O6W%2BtZQ%2B8inw%3D%3D';
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20200310'); 
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20200315'); 
*/

var requestUrl = `${HOST}/Covid19/getCovid19InfStateJson?ServiceKey=${SERVICE_KEY}&pageNo=1&numOfRows=10&startCreateDt=20200310&endCreateDt=20200315`

request.get(requestUrl, (err,res,body) =>{
  if(err){
      console.log(`err => ${err}`)
  }
  else {
      if(res.statusCode == 200){
          var result = body
          console.log(`body data => ${result}`)
          var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
          console.log(`xml to json => ${xmlToJson}`)

      }

  }
})

module.exports = app;
