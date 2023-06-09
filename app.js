// 아래 크롤링 옵션을 주석을 통해 조절 가능
//var startCrawling = require('./js/crawling.js');

var express = require('express');
var http = require('http');
var path = require('path');
var static = require('serve-static');

var app = express();

app.use(static(path.join(__dirname, '/')));

app.set('port', process.env.PORT || 8080);
// 서버를 동작했을 때 처음으로 보여줄 페이지
app.get('/', function (req, res) {
  res.redirect('./src/main.html');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Server START...' + app.get('port'));
});
