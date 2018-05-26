/**
 * Required Packages
 */
var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    notify = require('gulp-notify'),
    webpack = require('webpack-stream'),
    tailwindcss = require('tailwindcss');

/**
 * Copy third party libraries from /node_modules into /vendor
 * 
 * @since 1.0.0
 */
gulp.task('build', function() {
    gulp.src([

    ]);
});

/**
 * Compile Tailwind
 * 
 * @since 1.0.0
 */
gulp.task('css:compile', function() {
    return gulp.src('./assets/styles/app.tailwind')
        .pipe(postcss([
            tailwindcss('./tailwind.config.js')
        ]))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest('css/'))
        .pipe(notify(
            {
                message: 'Tailwind compiled'
            }
        ));
});

/**
 * Minify the CSS
 * 
 * @since 1.0.0
 */
gulp.task('css:minify', ['css:compile'], function() {
    return gulp.src([
        './css/*.css',
        '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(notify(
        {
            message: 'CSS minified'
        }
    ));
});

/**
 * Run all CSS tasks
 * 
 * @since 1.0.0
 */
gulp.task('css', ['css:minify']);

/**
 * Minify JS
 * 
 * @since 1.0.0
 */
gulp.task('js:minify', function() {
    return gulp.src('assets/scripts/main.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

/**
 * Run all JS tasks
 * 
 * @since 1.0.0
 */
gulp.task('js', ['js:minify']);

/**
 * Default Gulp task
 * 
 * @since 1.0.0
 */
gulp.task('default', ['css', 'js']);

/**
 * Dev task
 * This will run while you're building the theme and automatically compile any changes.
 * 
 * @since 1.0.0
 */
gulp.task('dev', ['css', 'js'], function() {
    gulp.watch('./tailwind.config.js', ['css']);
    gulp.watch('./assets/scripts/**/*.js', ['js']);
});