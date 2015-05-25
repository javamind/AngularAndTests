'use strict';

var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var ngAnnotate = require('gulp-ng-annotate');
var replace = require('gulp-replace');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

var app = {
  basedir :'.tmp',
  js      : 'app/main/**/*.js',
  html    : 'app/main/**/*.html',
  less    : 'app/assets/less/*.less',
  img     : 'app/assets/img/**/*.*',
  raw     : 'app/assets/raw/**/*.json',
  lib     : [
    'app/bower_components/angular/angular.min.js',
    'app/bower_components/angular-animate/angular-animate.min.js',
    'app/bower_components/angular-aria/angular-aria.min.js',
    'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'app/bower_components/angular-material/angular-material.min.js',
    'app/bower_components/angular-mocks/angular-mocks.js'
  ],
  libcss  : [
    'app/bower_components/angular-material/angular-material.min.css'
  ]
};

/* proxyMiddleware forwards static file requests to BrowserSync server
 and forwards dynamic requests to our real backend */
var proxy = require('http-proxy')
  .createProxyServer({
    target: {
      host: 'localhost',
      port: 8080
    }
  }).on('error', function(e){
    console.error(e);
  });

/**
 * Clean working diretcories
 */
gulp.task('clean', function() {
  return gulp.src([app.basedir], {read: false})
    .pipe(rimraf());
});

/**
 * Transforms less to css
 */
gulp.task('less', function() {
  gulp.src(app.less)
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(app.basedir + '/css'))
    .pipe(browserSync.reload({stream: true}));
});

/**
 * Copies HTML resources
 */
gulp.task('html', ['less'], function () {
  gulp.src(app.html)
    .pipe(gulp.dest(app.basedir))
    .pipe(browserSync.reload({stream: true}));

  gulp.src(app.img)
    .pipe(gulp.dest(app.basedir + '/img'))
    .pipe(browserSync.reload({stream: true}));

  gulp.src(app.raw)
    .pipe(gulp.dest(app.basedir + '/raw'))
      .pipe(browserSync.reload({stream: true}));
});

/**
 * Concats all the vendor libraries used by the project
 */
gulp.task('lib', function () {
  gulp.src(app.lib)
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(app.basedir))

  gulp.src(app.libcss)
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest(app.basedir + '/css'))
});

/**
 * Concats our js files
 */
gulp.task('js', ['lib', 'html'], function () {

  gulp.src(app.js)
    .pipe(jshint())
    .pipe(ngAnnotate({
      single_quotes: true,
      add: true
    }))
    .pipe(concat('application.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(app.basedir))
    .pipe(browserSync.reload({stream: true}));;
});

// Launches static server
gulp.task('serve', ['js', 'less', 'html'  ], function() {
  browserSync.init({
    startPath: '/index.html',
    server: {
      baseDir: app.basedir,
      middleware: [
        require('connect-modrewrite')([
          //Rewrite for the backend calls
          '^/api/(.*)$ http://localhost:8080/api/$1 [P]',
          //Rewrite for HML
          '!\\.\\w+$ /index.html [L]'
        ])
      ]
    }
  });
  //browserSyncInit(app.basedir);
  gulp.watch(app.less, ['less']);
  gulp.watch(app.html, ['html']);
  gulp.watch(app.js, ['js']);
});


gulp.task('default', ['serve'],function() {

});
