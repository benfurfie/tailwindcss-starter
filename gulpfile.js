/**
 * Required Packages
 */
var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    tailwindcss = require('tailwindcss');

/**
 * Copy third party libraries from /node_moudles into /vendor
 * 
 * @since 1.0.0
 */
gulp.task('build', function() {
    gulp.src([

    ]);
});

/**
 * Compile Front End SCSS
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
        .pipe(gulp.dest('build/'));
});