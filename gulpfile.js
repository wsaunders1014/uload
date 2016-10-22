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
    .pipe(replace(/\.all\./g, '.all.min.'))
   //  .pipe(inlinesource())
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
// GULP SFTP
var sftp = require('gulp-sftp');
var ip = '54.89.81.25';
var passW = 'gm-008';
gulp.task('sftp-js', ['build-js'], function () {
  return gulp.src('build/js/move-info/*.js')
    .pipe(sftp({
      host: ip,
      user: 'root',
      pass: passW,
      remotePath: '/home/uload/uloadnew/trunk/public/js/move-info/'
    }));
});
gulp.task('sftp-css', ['minifyCSS'], function () {
  return gulp.src('build/css/move-info/*.css')
    .pipe(sftp({
      host: ip,
      user: 'root',
      pass: passW,
      remotePath: '/home/uload/uloadnew/trunk/public/css/move-info/'
    }));
});
gulp.task('monitor-move-information', function () {
  return gulp.src('src/move-information.phtml')
    .pipe(sftp({
      host: ip,
      user: 'root',
      pass: passW,
      remotePath: '/home/uload/uloadnew/trunk/module/Uload/view/uload/get-quotes/'
    }));
});
// gulp.task('sftp-inline', ['minifyCSS'], function () {
//   return gulp.src('build/css/inline/*.phtml')
//     .pipe(sftp({
//       host: ip,
//       user: 'root',
//       pass: passW,
//       remotePath: '/home/budgetvanlines-2/module/Equate/view/equate/inline/'
//     }));
// });
// gulp less
var less = require('gulp-less');
var path = require('path');
gulp.task('compileLess', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/move-info'));
});
gulp.task('minifyCSS', ['compileLess'], function(){
  return gulp.src(['!src/css/**/style.all.css','!src/css/**/style.all.min.css','src/css/move-info/**.css'])
    .pipe(concat('style.all.css'))
    .pipe(gulp.dest('src/css/move-info/'))
    .pipe(gulp.dest('build/css/move-info/'))
    .pipe(rename({suffix:'.min'}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('src/css/move-info/'))
    .pipe(gulp.dest('build/css/move-info/'));
});
gulp.task('build-js', function(cb) {
  pump([gulp.src(['!src/js/move-info/scripts.all.js','src/js/**/*.js']),
    concat('scripts.all.js'),
    gulp.dest('src/js/move-info/'),
    gulp.dest('build/js/move-info/'),
    uglify(),
    rename({suffix:'.min'}),
    gulp.dest('build/js/move-info/'),
    gzip(),
    gulp.dest('build/js/move-info/')], 
    cb
  );
});


gulp.task('watch', function() {

  gulp.watch('src/img/*', ['imgmin']);
  gulp.watch('src/js/**/*', ['build-js','sftp-js']);
  gulp.watch('src/less/*', ['compileLess','minifyCSS','sftp-css']);
  gulp.watch('src/index.php', ['replaceMin']);
  gulp.watch('src/move-information.phtml', ['monitor-move-information']);
 // gulp.watch('build/index.php',['makeInlineCSSRelative']);
});