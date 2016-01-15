#+TITLE: Introduction to ICS

# Introduction to Computer Systems

With your host, Dr. Tom Nurkkala

Here are some interesting factoids about the course
1. It's fun
1. You will have a great time
1. There will be a ton of work to do

Here's an illustration of the cover of the textbook.

#+VISUAL

### This is our textbook's cover!
![CSAPP Cover](/images/csapp.jpg)

#+NOTES

It's really quite a delightful text.
- You should all read it carefully.

Here's a little code for your consumption.
```javascript
gulp.task('markdown', function() {
    return gulp.src(course)
        .pipe(markdown())
        .pipe(gulp.dest('build'))
});
```
