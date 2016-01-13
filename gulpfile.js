/**
 * Created by tom on 1/12/16.
 */

var gulp = require('gulp');
var markdown = require('gulp-markdown');
var wrap = require('gulp-wrap');

var hljs = require('highlight.js');

gulp.task('hello', function() {
    console.log("Hello, Gulp")
});

gulp.task('markdown', function() {
    const markedOptions = {
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    };

    return gulp.src('src/*.md')
        .pipe(markdown(markedOptions))
        .pipe(wrap({ src: 'src/template/main.hbs' }, null, { engine: 'handlebars' }))
        .pipe(gulp.dest('build'))
});

gulp.task('images', function () {
    return gulp.src('src/static/*.jpg')
        .pipe(gulp.dest('build/static'))
});

gulp.task('default', ['markdown', 'images']);
