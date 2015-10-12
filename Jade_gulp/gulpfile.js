/*---MiniMatchパターン---*/

//“sass/style.scss”
//sass/style.scssだけヒット

//“sass/*.scss”
//sassディレクトリ直下にあるscssがヒット

//“sass/**/*.scss”
//sassディレクトリ以下にあるすべてのscssがヒット

//[“sass/**/.scss”,"!sass/sample/**/*.scss]
//sass/sample以下にあるscssを除くsassディレクトリ以下のscssがヒット

/*---gulp基本の書き方---*/
//gulp.task(“タスク名”,function() {});でタスクの登録
	//gulp.src(“MiniMatchパターン”)で読み出したいファイルを指定
    	//pipe(おこないたい処理)でsrcで取得したファイルに処理
        //gulp.dest(“出力先”)で出力先に処理を施したファイルを出力


//プラグイン
var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require('gulp-uglify');
var autoprefixer = require("gulp-autoprefixer");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");


//ブラウザへの反映を自動化
gulp.task("server", function() {
	browser({
		server: {
			baseDir: "./"
		}
	});
});


//JSの圧縮を自動化
gulp.task('js', function() {
 	gulp.src(['js/**/*.js', '!js/min/**/*.js'])
 		.pipe(plumber())
 		.pipe(uglify())
 		.pipe(browser.reload())
 		.pipe(gulp.dest('./js/min'))
 		.pipe(browser.reload({
 			stream: true
 		}));
 });

//sassのコンパイル
gulp.task("sass", function() {
    gulp.src("sass/**/*.scss")
    	.pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({
 			stream: true
 		}));
});

//ファイルの監視
gulp.task('default',function() {
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch("sass/**/*.scss",["sass"]);
    gulp.watch("*.html", ["server"]);
});


