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

var url = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson';

/*
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=';
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); 
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10');
queryParams += '&' + encodeURIComponent('startCreateDt') + '=' + encodeURIComponent('20200310'); 
queryParams += '&' + encodeURIComponent('endCreateDt') + '=' + encodeURIComponent('20200315'); 
*/

/*
request({
    url: url + queryParams,
    method: 'GET'
}, function (error, response, body) {
    console.log('Status', response.statusCode);
    console.log('Headers', JSON.stringify(response.headers));
    console.log('Reponse received', body);
});
*/
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
