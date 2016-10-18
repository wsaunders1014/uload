var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var gzip = require('gulp-gzip');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require('gulp-rename');
var cache = require('gulp-cache');
//default
// gulp.task('default', function() {
//   // place code for your default task here
// });
gulp.task('default', ['watch']);
//clean-css

gulp.task('minify-css', function() {
  return gulp.src('src/styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css/'));
});
//concat


gzip
gulp.task('gzipAll', function() {
    gulp.src('src/**/*.*')
    .pipe(gzip())
    .pipe(gulp.dest('build/'));
});

//html min

//image min
gulp.task('imgmin', function(){
    return gulp.src('src/img/*')
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(gulp.dest('build/img'))
});
//inject
// var inject = require('gulp-inject');
// gulp.task('inject', function () {
//    var target = gulp.src('src/index.php');
// //   // It's not necessary to read the files (will speed up things), we're only after their paths: 
//    var sources = gulp.src(['build/js/all.min.js', 'build/css/style.css'], {read: false});
 
//  return target.pipe(inject(sources))
//     .pipe(gulp.dest('build'));
//  });
//uglify-js
// gulp.task('compress', function (cb) {
//   pump([
//         gulp.src('src/*.js'),
//         uglify(),
//         gulp.dest('build')
//     ],
//     cb
//   );
// });

//GULP INLINE SOURCE
var inlinesource = require('gulp-inline-source');
gulp.task('inlineCSS', function() {
  return gulp.src('src/index.php')
    .pipe(inlinesource())
    .pipe(gulp.dest('build/'));
});

//GULP REPLACE
var replace = require('gulp-replace');
gulp.task('replaceMin', function(){
  gulp.src(['src/index.php'])
    .pipe(replace(/css\/style\.all\.css/g, 'css/style.all.min.css'))
    .pipe(replace(/js\/all/, 'js/all.min'))
     .pipe(inlinesource())
    .pipe(gulp.dest('build/',{overwrite:true}));
});
gulp.task('makeInlineCSSRelative', function(){
  gulp.src(['build/index.php'])
    .pipe(replace(/\.{2}\//g, ''))
    .pipe(gulp.dest('build/',{overwrite:true}));
});
//  gulp.task('minifyHTML', function() {
//   return gulp.src('src/*.php')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('build'));
// });
// gulp less

var less = require('gulp-less');
var path = require('path');
gulp.task('compileLess', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less({paths: [path.join(__dirname, 'less', 'includes')]}))
    .pipe(gulp.dest('src/css/'));
});
gulp.task('minifyCSS', function(){
  return gulp.src(['!src/css/style.all.css','!src/css/style.all.min.css','src/css/*.css'])
    .pipe(concat('style.all.css'))
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('build/css/'))
    .pipe(rename({suffix:'.min'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('src/css/'))
    .pipe(gulp.dest('build/css/'));
})
gulp.task('build-js', function() {
  return gulp.src(['!src/js/all.js','src/js/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('src/js/'))
    .pipe(gulp.dest('build/js/'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('build/js/'))
    .pipe(gzip())
    .pipe(gulp.dest('build/js/'));
});


gulp.task('watch', function() {

  gulp.watch('src/img/*', ['imgmin']);
  gulp.watch('src/js/*', ['build-js']);
  gulp.watch('src/less/*', ['compileLess','minifyCSS']);
  gulp.watch('src/index.php', ['replaceMin']);
  gulp.watch('build/index.php',['makeInlineCSSRelative']);
});