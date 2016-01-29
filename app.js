/**
 * Created by tom on 1/15/16.
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Middleware
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../build/public')));
app.use('/revealjs', express.static(path.join(__dirname, 'vendor/revealjs')));

// Routes
app.get('/:course/notes/:name', function(req, res) {
    res.sendFile(path.join(__dirname, 'course', req.params.course, 'notes', req.params.name + '.html'));
});

app.get('/:course/visuals/:name', function(req, res) {
    res.sendFile(path.join(__dirname, 'course', req.params.course, 'visuals', req.params.name + '.html'));
});

app.get('/:course/images/:file', function(req, res) {
    res.sendFile(path.join(__dirname, 'course', req.params.course, 'images', req.params.file));
});

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler; print stack trace.
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler; no stack trace leaked to user.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Handle socket.io
io.on('connection', function(socket) {
    console.log('Socket connected');

    socket.on('disconnect', function () {
        console.log('Socket disconnected');
    });

    socket.on('request-visual', function(id) {
        console.log('Request for visual', id);
        io.emit('show-visual', id);
    });
});

// Run the server.
http.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port'));
});
