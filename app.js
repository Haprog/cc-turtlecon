#!/usr/bin/env nodejs
var express = require('express');
var cons = require('consolidate');
var log = require('./log');
var app = express();

app.set('trust proxy', 'loopback');
app.disable('x-powered-by');

// Assign Mustache engine to .mustache files.
app.engine('mustache', cons.mustache);

// Set .mustache as the default extension
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.render('index', { name: 'World' });
});
app.get('/name/:name', function (req, res) {
  res.render('index', req.params);
});
app.get('/log', log.view);
app.post('/log', log.post);

app.use(function(req, res, next) {
  res.status(404).render('404');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
