/**
 * Created by tom on 1/29/16.
 */

'use strict';

var gulp = require('gulp');
var bs = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('browser-sync', ['nodemon'], function() {
    bs.init(null, {
        proxy: "http://localhost:5000",
        files: ['course/**/*.*']
    });
});

gulp.task('nodemon', function (cb) {
    var started = false; // Avoid multiple starts

    return nodemon({
        script: 'app.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('default', ['browser-sync'], function () {
});
