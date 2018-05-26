/**
 * Required Packages
 */
var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    notify = require('gulp-notify'),
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