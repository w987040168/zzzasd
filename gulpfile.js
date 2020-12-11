const gulp = require('gulp')
const sass = require('gulp-sass')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const webserver = require('gulp-webserver')
//  gulp.task('sassHandler', () => {
//     return gulp
//       .src('./src/sass/*.scss')
//       .pipe(sass())
//       .pipe(autoprefixer())
//       .pipe(cssmin())
//       .pipe(gulp.dest('./dist/sass/'))
// })

const sassHandler = () => {
    return gulp
      .src('./src/sass/*.scss')
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(gulp.dest('./dist/sass/'))
}

const cssHandler = () => {
    return gulp
    .src('./src/css/*.css')

    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))
}

const jsHandler = () => {
    return gulp
    .src('./src/js/*.js')
    .pipe(babel({ presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
}

const serverHandler = () => {
    // 找到文件
    return gulp
      .src('./src/server/*.php')
      .pipe(gulp.dest('./dist/server/'))
  }
const imgHandler = () => {
    // 找到文件
    return gulp
      .src('./src/img/*.**')
      .pipe(gulp.dest('./dist/img/'))
  }
const htmlHandler = () => {
    return gulp
    .src('./src/pages/*.html')
    .pipe(htmlmin({
        // collapseWhitespace: true,//去空白
        collapseBooleanAttributes:true,//简写布尔值属性
        removeAttributeQuotes:true,//去除属性引号
        removeComments:true,//去注释
        removeEmptyAttributes:true,//去空属性
        removeScriptTypeAttributes:true,
        removeStyleLinkTypeAttributes:true,
        minifyJS:true,
        minifyCSS:true,

    }))
    .pipe(gulp.dest('./dist/pages/'))
}

const delHandler = () => {
    return del('./dist/')
}
const webHandler = () => {
    return gulp
    .src('./dist/')
    .pipe(webserver({
        host: 'localhost',
        port: 8080,
        open:'./pages/a.html',
        livereload: true,
    }))
}
const watchHandler = () => {
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/sass/*.sass', sassHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./src/img/*.*',imgHandler)
    gulp.watch('./src/server/*.php',serverHandler)
}
const defaultHandler = gulp.series(
    delHandler,
    gulp.parallel(sassHandler,cssHandler,htmlHandler,jsHandler,imgHandler),
    webHandler,
    watchHandler
)
module.exports.sassHandler = sassHandler

module.exports.cssHandler = cssHandler
module.exports.jsHandler = serverHandler
module.exports.jsHandler = jsHandler
module.exports.imgHandler = imgHandler
module.exports.htmlHandler = htmlHandler
module.exports.default =  defaultHandler