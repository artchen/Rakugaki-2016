/* gulp dependencies */
var gulp = require('gulp');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var minifyHTML = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var lessDependents = require('gulp-less-dependents');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

/* path def */
var path = {
	ICOMOON: [
		'src/icomoon/**',
		'src/icomoon/*'
	],
  HTML: [
  	'src/*.html', 
  	'src/views/**/*.html', 
  	'src/views/*.html', 
  ],
  JS: [
  	'src/js/*.js', 
  	'src/js/**/*.js'
  ],
  LESS: [
  	'src/less/style.less'
  ],
  LESS_ALL: [
  	'src/less/*.less'
  ], 
  IMG: [
  	'src/img/**'
  ],
  ANGULAR: [
  	'bower_components/angular/angular.js', 
		'bower_components/angular-animate/angular-animate.js', 
		'bower_components/angular-touch/angular-touch.js',
		'bower_components/angular-ui-router/release/angular-ui-router.js'
	],
  JQUERY: [
		'bower_components/jquery/dist/jquery.js',
		'bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.js'
	],
	OTHER: [
		'src/.htaccess',
  	'src/favicon.ico',
  	'src/resume.pdf',
	],
  DIST: './dist'
};

var all_tasks = ['jshint', 'less', 'js', 'html', 'img', 'jquery', 'angular', 'icomoon'];

/* spin up distribution server */
gulp.task('connect', function() {
	connect.server({
		root: 'dist',
		port: 4005
	});
});

/* clean up dist dir */
gulp.task('clean', function() {
	return gulp.src('./dist/*', {force: true})
		.pipe(clean());
});

/* jshint */
gulp.task('jshint', function() {
  return gulp.src(path.JS)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

/* compile less */
gulp.task('less', function () {
  gulp.src(path.LESS)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.DIST));
});

/* concat and compress app scripts */
gulp.task('js', function () {
  gulp.src(path.JS)
  	//.pipe(sourcemaps.init())
			.pipe(concat('app.js'))
			.pipe(ngAnnotate())
			.pipe(uglify())
		//.pipe(sourcemaps.write())
    .pipe(gulp.dest(path.DIST + '/js'));
});

/* concat angular dependencies */
gulp.task('angular', function () {
	gulp.src(path.ANGULAR)
		.pipe(concat('ang.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
    .pipe(gulp.dest(path.DIST + '/js'));
});

/* concat jquery dependencies */
gulp.task('jquery', function () {
	gulp.src(path.JQUERY)
		.pipe(concat('jq.js'))
		.pipe(uglify())
    .pipe(gulp.dest(path.DIST + '/js'));
});

/* copy over markups */
gulp.task('html', function(){
  gulp.src(path.HTML, {base: 'src'})
  	.pipe(minifyHTML({
	  	removeComments: true,
	  	collapseWhitespace: true,
	  	conservativeCollapse: true,
	  	preserveLineBreaks: true
	  }))
    .pipe(gulp.dest(path.DIST));
  gulp.src(path.OTHER)
  	.pipe(gulp.dest(path.DIST));
});

/* copy over icomoon */
gulp.task('icomoon', function(){
  gulp.src(path.ICOMOON)
    .pipe(gulp.dest(path.DIST + '/icomoon'));
});

/* compress images */
gulp.task('img', function(){
  gulp.src(path.IMG)
    .pipe(imagemin())
    .pipe(gulp.dest(path.DIST + '/img'));
});

/* watch all changes */
gulp.task('watch', function () {
  gulp.watch(path.LESS_ALL, ['less']);
  gulp.watch(path.ANGULAR, ['angular']);
  gulp.watch(path.JQUERY, ['jquery']);
  gulp.watch(path.JS, ['jshint', 'js']);
  gulp.watch(path.HTML, ['html']);
  gulp.watch(path.IMG, ['img']);
  gulp.watch(path.ICOMOON, ['icomoon']);
});

/* build all */
gulp.task('build', all_tasks);

/* defualt */
gulp.task('default', all_tasks);
