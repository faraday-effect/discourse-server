/**
 * Created by tom on 1/15/16.
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

// Configuration
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../build/public')));
app.use('/revealjs', express.static(path.join(__dirname, 'vendor/revealjs')));

// Routes
app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('Hello');
});

// 404
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

// 500
app.use(function(err, req, res, next) {
    console.error(err.stack);
    rsp.type('text/plain');
    rsp.status(500);
    rsp.send('500 - Server error');
});

// Run the server.
app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port'));
});

