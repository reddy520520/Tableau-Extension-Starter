
const express = require('express');
var port = process.env.PORT || 3000;
var http = require('http'),
    app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

var readTemplate = function (file, callback) {
  fs.readFile("templates/"+file, function(err, trex) {
     if (err) throw err;
     var re = /({{[A-Za-z0-9\-\_]+}})/g;
     var placeholders = trex.toString().match(re);
     callback(trex, placeholders);
  });
}

var getTemplates = function(callback) {
  fs.readdir("templates/", function(err, files) {
    if (err) throw err;
    callback(files);
  });
};

app.use( bodyParser.json({limit: '5000mb'}) );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended:true, limit: '5000mb', parameterLimit: 10000000}));

app.use('/healthcheck', require('express-healthcheck')());

app.get('/api/templates', function(req, res) {

});

app.listen(port, function() {
  console.log("Listening on http://127.0.0.1:3000");
});