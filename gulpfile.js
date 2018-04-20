/**
 * Created by guizhong on 15/8/4.
 */

var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var bs  = require("browser-sync");
var webpack = require("webpack");
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');                //- 压缩js代码
var minifyCss = require('gulp-minify-css');         //- 压缩CSS文件；
var rev = require('gulp-rev');                      //- 对css、js文件名加MD5后缀
var clean = require('gulp-clean');                  //- 用于删除文件
var babel = require('gulp-babel');
var revCollector = require('gulp-rev-collector');   //- 路径替换


gulp.task('cleanbabel',function(){
    gulp.src('dist/jsbabel/**/*.js',{read:false})
    .pipe(clean());
});

/* 编译es6-es5*/
gulp.task('babel',['cleanbabel'], function(){
    gulp.src('src/asset/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/jsbabel'))
    .on('end',function(){
        console.log('babel has been completed')
    })
})


/*清理文件*/
gulp.task('clean',['babel'], function () {                     //删除dist目录下的所有文件
    gulp.src('dist/asset/js/**/*.js',{read:false})
        .pipe(clean());
        gulp.src('dist/asset/css/**/*.css',{read:false})
        .pipe(clean());
        gulp.src('dist/**/*.html',{read:false})
        .pipe(clean());
        gulp.src('dist/asset/images/*',{read:false})
        .pipe(clean());
});

gulp.task('less', function () {
    return gulp.src("src/asset/css/*.css")
        .pipe($.less())
        // .pipe($.autoprefixer('last 2 version', 'ios 7', 'android 4'))
        .pipe($.minifyCss())
        // .pipe($.rename(function (path) {
        //     path.dirname = path.dirname.replace('less','css');
        //     path.basename = path.basename.replace('.main','');
        //   }))
        .pipe(rev())                                //- 文件名加MD5后缀
        .pipe(gulp.dest('dist/asset/css'))
        .pipe(rev.manifest())                       //- 生成一个rev-manifest.json
        .pipe(gulp.dest('dist/rev-css'))      
});

gulp.task('js', function () {

    // return gulp.src('src/asset/js/**/*.js')
    //     .pipe(babel())
    //     .pipe(gulp.dest('dist/jsbabel'))
    //     .pipe($.uglify())  //使用uglify进行压缩
    //     .pipe(rev())                            //- 文件名加MD5后缀
    //     .pipe(gulp.dest('dist/asset/js/'))
    //     .pipe(rev.manifest())            

    return gulp.src('dist/jsbabel/**/*.js')
        .pipe($.uglify())  //使用uglify进行压缩
        .pipe(rev())                            //- 文件名加MD5后缀
        .pipe(gulp.dest('dist/asset/js/'))
        .pipe(rev.manifest())                    //- 生成一个rev-manifest.json
        .pipe(gulp.dest('dist/rev-js'));                //- 将rev-manifest.json保存到 rev-js 目录内;
});

gulp.task('img', function () {
    return gulp.src('src/asset/images/**/*')
        .pipe($.imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist/asset/images'));
});


// copy
gulp.task('copy', function() {
    return gulp.src('src/static/**/*'
        // ['src/static/*'], {
        //     base: './src/asset/'   //如果设置为 base: 'js' 将只会复制 js目录下文件, 其他文件会忽略
        // }
    ).pipe(gulp.dest('dist/static/'));
});

/*修改html文件的link标签和script标签引用的css和js文件名，并把html文件输出到指定的位置*/
gulp.task('html',['less','js', 'img'], function() {          //- compress-css和compress-js任务执行完毕再执行rev-index任务
    /*修改其它html文件的link标签和script标签引用的css和js文件名，并把html文件输出到指定的位置*/
    gulp.src(['dist/rev-css/*.json','dist/rev-js/*.json', './src/**/*.html'])     //- 读取两个rev-manifest.json文件以及需要进行css和js名替换的html文件
        .pipe(revCollector())                                                      //- 执行文件内css和js名的替换
        .pipe(gulp.dest('./dist'));                                            //- 替换后的html文件输出的目录
});



gulp.task('watch', ['build'], function () {
    $.livereload.listen();

    var changed = [];

    gulp.watch("src/**/*.html", ['html', pop]).on('change', push);
    
    gulp.watch('src/**/*.js', ['js',pop]).on('change',push);

    gulp.watch("src/css/*.css", ['css', pop]).on('change', push);


    function push(s) {
        changed.push(s);
    }

    function pop() {
        while (changed.length > 0) {
            var s = changed.pop();
            console.log(s);
            $.livereload.changed(s);
            bs.reload();
        }
    }
});

gulp.task('build', ['html', 'copy']);

gulp.task("default",function(){

    bs(
        {
            server: "./dist"
        }
    );
    gulp.start('watch');
});


