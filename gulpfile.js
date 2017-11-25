const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const ngAnnotate = require('gulp-ng-annotate');
const babelify = require('babelify');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const importCss = require('gulp-import-css');


gulp.task('scripts', () =>
  browserify('./src/angular-sidebarjs.js')
    .transform(babelify, {
      presets: ['es2015'],
    })
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('angular-sidebarjs.js'))
    .pipe(buffer())
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist')));

gulp.task('styles', () =>
  gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(importCss())
    .pipe(gulp.dest('./dist'))
    .pipe(rename({extname: '.min.css'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist')));


gulp.task('watch', () => {
  gulp.watch('./src/angular-sidebarjs.js', ['scripts']);
});

gulp.task('build', ['scripts', 'styles', 'watch']);
