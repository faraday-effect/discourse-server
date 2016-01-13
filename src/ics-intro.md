# Introduction to Computer Systems

With your host, Dr. Tom Nurkkala

Here are some interesting factoids about the course
- It's fun
- You will have a great time
- There will be a ton of work to do

Here's an illustration of the cover of the textbook.

[//]: # "<Slide>"

![CSAPP Cover](static/csapp.jpg)

[//]: # "</Slide>"

It's really quite a delightful text.
You should all read it carefully.

Here's a little code for your consumption.
```javascript
gulp.task('markdown', function() {
    return gulp.src('src/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('build'))
});
```
