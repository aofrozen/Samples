var gulp = require('gulp');

var gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    copy = require('gulp-copy'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    buffer = require('vinyl-buffer'),
    fastbrowserify = require('browserify'),
    assign = require('lodash.assign'),
    sass = require('gulp-sass');




/* METEOR OPTIMIZATION */

gulp.task('meteor', function(){
    gulp.start('sass:watch');
});

gulp.task('sass', function () {
    gulp.src(['app/client/**/*.sass', 'app/sass/*.sass'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('app/client/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch(['app/sass/*.sass', 'app/client/**/*.sass'], ['sass']);
});

// add custom browserify options here
var customOpts = {
    entries: ['./public/js/app/app.js'],
    debug: false
};
var opts = assign({}, watchify.args, customOpts);

var b = watchify(fastbrowserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
    return b.bundle()
    // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('app-bundle.js'))
        // optional, remove if you don't need to buffer file contents
        //.pipe(buffer())
        // optional, remove if you dont want sourcemaps
        //.pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        //.pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('public/js/app/'));
}
