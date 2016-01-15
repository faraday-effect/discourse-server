/**
 * Created by tom on 1/12/16.
 */

var gulp = require('gulp');
var markdown = require('gulp-markdown');
var wrap = require('gulp-wrap');
var debug = require('gulp-debug');
var through = require('through2');

var hljs = require('highlight.js');

const VISUAL_ENV = '#+VISUAL';
const NOTES_ENV = '#+NOTES';
const ANY_ENV = '#+';

const env_details = { };
env_details[VISUAL_ENV] = { start_block: '<section>', end_block: '</section>' };
env_details[NOTES_ENV] = { start_block: '', end_block: '' };

function extractEnvironment (env) {
    return through.obj(function (file, encoding, callback) {
        var inEnv = false;
        var inputLines = file.contents.toString().split(/\r\n?|\n/);
        var outputLines = [ ];

        inputLines.forEach(function (line) {
            if (line.indexOf(env) === 0) {
                // Beginning of this environment
                if (inEnv) {
                    // Already in the environment; stop the current block
                    outputLines.push(env_details[env].end_block);
                }
                inEnv = true;
                outputLines.push(env_details[env].start_block);
                return;
            } else if (line.indexOf(ANY_ENV) === 0) {
                // End of environment
                inEnv = false;
                outputLines.push(env_details[env].end_block);
                return;
            }

            if (inEnv) {
                // Within environment
                outputLines.push(line);
            }
        });

        if (inEnv) {
            // Still in environment at end of input
            outputLines.push(env_details[env].end_block);
        }

        file.contents = new Buffer(outputLines.join('\n'));
        callback(null, file);
    });
}

const markedOptions = {
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
};

gulp.task('notes', function() {
    return gulp.src('course/*.md')
        .pipe(markdown(markedOptions))
        .pipe(wrap({ src: 'templates/notes.hbs' }, null, { engine: 'handlebars' }))
        .pipe(gulp.dest('build/notes'))
});

gulp.task('visuals', function() {
    return gulp.src('course/*.md')
        .pipe(extractEnvironment(VISUAL_ENV))
        .pipe(markdown(markedOptions))
        .pipe(wrap({ src: 'templates/visuals.hbs' }, null, { engine: 'handlebars' }))
        .pipe(gulp.dest('build/visuals'))
});

gulp.task('images', function () {
    return gulp.src('course/images/*.jpg')
        .pipe(gulp.dest('build/images'))
});

gulp.task('default', ['notes', 'visuals', 'images']);

// gulp.watch('course/*.md', ['notes', 'visuals']);
// gulp.watch('course/images/*.jpg', ['images']);
