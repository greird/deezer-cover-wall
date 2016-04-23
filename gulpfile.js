// Load plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        //.pipe(gulp.dest('js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify({ preserveComments: "license" }))
        .pipe(gulp.dest('js/min'))
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Default task
 gulp.task('default', ['watch'], function() {
   gulp.start('lint', 'scripts');
 });

// Watch
gulp.task('watch', function() {

  // Watch .js files
  gulp.watch('js/*.js', ['lint', 'scripts']);

});
