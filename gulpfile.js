require('coffee-script/register');
var gutil = require('gulp-util');
var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')({lazy: true});
var runSequence = require('run-sequence');
var args = require('yargs').argv;
var scaffoldCli = require('gulp-scaffold-cli');
var buildAutomation = require('gulp-build-automation');

var npmPackage = require('./package.json');
var coffeeLint = require('./coffeelint.json');
var bower = require('./bower.json');
var tslint = require('./tslint.json');
var componentPath = 'component/section';
var componentName = 'module-name';
var tasksGlob = __dirname + '/gulp/**/*.task.+(coffee|js|ts)';

var defaultSettings = {
  npm: npmPackage,
  gulp: gulp,
  tmp: __dirname + '/.tmp',
  rootPath: path.normalize(__dirname),
  dist: path.normalize(__dirname + '/lib'),
  coffeeLint: coffeeLint,
  bower: bower,
  verbose: true,
  coveragePath: './.coverage/',
  args: args,
  tslint: tslint,
   tasks: {
    browserReload: {
      files: [
        './lib/**/*.*',
      ],
      options: {
        server: {
          baseDir: [
            './lib/',
          ]
        }
      }
    }
  }
};

buildAutomation.activate('cleanHtml', true);
buildAutomation.activate('compileHtml', true);
buildAutomation.activate('browserReload', true);
buildAutomation.activate('watcher', true);
buildAutomation.activate('cleanCss', true);
buildAutomation.activate('compileCss', true);

scaffoldCli.render(tasksGlob, defaultSettings);
buildAutomation.start(defaultSettings);

/*
 * default task
 */
gulp.task('task-listing', buildAutomation.taskListing)
gulp.task('help', $.taskListing)
gulp.task('default', [
  'help', 'task-listing'
]);

/*
 * html task
 */
gulp.task('build', [
  'compileHtml','compileCss', 'copy'
]);

/*
 * html task
 */
gulp.task('serve', [
  'build', 'browserReload', 'watcher'
]);


/*
 * html task
 */
gulp.task('copy', function(){
  return gulp.src([
    'source/img/*'
  ])
    .pipe(gulp.dest('./lib/img'))
});
