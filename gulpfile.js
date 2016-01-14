/**
 * Created by tom on 1/12/16.
 */

var gulp = require('gulp');
var markdown = require('gulp-markdown');
var wrap = require('gulp-wrap');
var debug = require('gulp-debug');
var through = require('through2');

var hljs = require('highlight.js');

function filterVisuals () {
    return through.obj(function (file, encoding, callback) {
        var in_visual = false;

        var inLines = file.contents.toString().split(/\r\n?|\n/);
        var outLines = [ ];

        inLines.forEach(function (line) {
            if (line.indexOf('<div') === 0) {
                in_visual = true;
            } else if (line.indexOf('</div>') === 0) {
                outLines.push(line);
                in_visual = false;
            }

            if (in_visual) {
                outLines.push(line);
            }
        });

        file.contents = new Buffer(outLines.join('\n'));
        callback(null, file);
    });
}

const markedOptions = {
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
};

gulp.task('notes', function() {
    return gulp.src('src/*.md')
        .pipe(markdown(markedOptions))
        .pipe(wrap({ src: 'src/template/notes.hbs' }, null, { engine: 'handlebars' }))
        .pipe(gulp.dest('build/notes'))
});

gulp.task('visuals', function() {
    return gulp.src('src/*.md')
        .pipe(filterVisuals())
        .pipe(markdown(markedOptions))
        .pipe(wrap({ src: 'src/template/visuals.hbs' }, null, { engine: 'handlebars' }))
        .pipe(gulp.dest('build/visuals'))
});

gulp.task('images', function () {
    return gulp.src('src/static/*.jpg')
        .pipe(gulp.dest('build/static'))
});

gulp.task('default', ['notes', 'visuals', 'images']);

// gulp.watch('src/*.md', ['notes', 'visuals']);
// gulp.watch('src/static/*.jpg', ['images']);
