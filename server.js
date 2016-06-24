var express = require('express');
var path = require('path');
var url = require('url');

var app = express();

app.use('/third_party', express.static('bower_components'));
app.use('/polymer_flow', express.static('polymer_flow'));
app.use('/elements', express.static('elements'));
app.use('/scripts', express.static('scripts'));
app.use('/resources', express.static('resources'));
app.use('/css', express.static('css'));

app.use(express.static('root'));

app.listen(8000, function () {
  console.log('App listening on port 8000!');
});
