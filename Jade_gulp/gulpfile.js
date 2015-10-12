
var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require('gulp-uglify');
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var jade = require("gulp-jade");

//gulp.task(“タスク名”,function() {});でタスクの登録
//gulp.src(“MiniMatchパターン”)で読み出したいファイルを指定
//pipe(おこないたい処理)でsrcで取得したファイルに処理
//gulp.dest(“出力先”)で出力先に処理を施したファイルを出力

//“sass/style.scss”　sass/style.scssだけヒット
//“sass/*.scss”　sassディレクトリ直下にあるscssがヒット
//“sass/**/*.scss”　sassディレクトリ以下にあるすべてのscssがヒット
//[“sass/**/.scss”,"!sass/sample/**/*.scss]　sass/sample以下にあるscssを除くsassディレクトリ以下のscssがヒット

var basedir = "./dest/";
var dir = basedir;

//gulp.dest上でgulp.srcの構成を再現
gulp.task( 'copy', function() {
    return gulp.src(
        [ 'src/*.html', 'src/css/**', 'src/js/*.js' ],
        { base: 'src' }
    )
    .pipe( gulp.dest( 'dest' ) );
} );

//ブラウザへの反映を自動化
gulp.task("server", function() {
	browser({
		server: {
			baseDir: basedir
		}
	});
});

//JSの圧縮を自動化
gulp.task('js', function() {
 	gulp.src(['./src/js/**/*.js', '!./source/_copythis/**/*', '!./source/_partial/**/*'])
 		.pipe(plumber())
 		.pipe(uglify())
 		.pipe(gulp.dest(dir))
 		.pipe(browser.reload({stream: true}));
 });

//sassのコンパイル
gulp.task('sass', function() {
    gulp.src("./sass/**/*.scss")
    	.pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream: true}));
});


//jadeコンパイル
gulp.task('jade', function() {
 	gulp.src('./jade/**/*.jade')
 		.pipe(plumber())
 		.pipe(jade({
 			pretty: true,
 			test: 'あああ'
 		}))
 		.pipe(gulp.dest('./src'))
 		.pipe(browser.reload({stream: true}));
 });


//ファイルの監視
gulp.task('default', ['server'], function() {
    gulp.watch(["./js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch(["./sass/**/*.scss", "./source/**/*.css"],["sass"]);
    gulp.watch("*.html", ["server"]);
});



