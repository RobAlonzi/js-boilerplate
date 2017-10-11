import gulp from "gulp";
import webpack from "webpack";
import rimraf from "rimraf";
import serve from "gulp-serve";
import mocha from "gulp-mocha";
import {create as createWebpackConfig} from "./webpack.config";

// ---------------------------
// Helper Tasks
gulp.task("clean", cb => rimraf("./public", cb));
gulp.task('serve', serve('public'));

// ---------------------------
// Dev Tasks
gulp.task("run:dev", gulp.series("clean", startDev));

function startDev(){
	const WebpackDevServer = require("webpack-dev-server");
	const compiler = webpack(createWebpackConfig(true));
	const server = new WebpackDevServer(compiler, {
		headers: { "Access-Control-Allow-Origin": "http://localhost:3000", "Access-Control-Allow-Credentials": "true" },
		contentBase: "./public/",
		historyApiFallback: true,
		hot: true
	});

	server.listen(3000, () => {
		console.log("Server started at http://127.0.0.1:3000");
	});
}

// ---------------------------
// Prod Tasks
gulp.task("run:prod", gulp.series("clean", buildProd, "serve"));

function buildProd(callback){
	let config = createWebpackConfig(false);

	const consoleStats = {
		colors: true,
		exclude: ["node_modules"],
		chunks: false,
		assets: false,
		timings: true,
		modules: false,
		hash: false,
		version: false
	};

    webpack(config, (err, stats) => {
		if(err){
			callback(err);
			return;
		}

		console.log(stats.toString(consoleStats));
		callback();
	});
}

// ---------------------------
// Test Tasks
gulp.task('run:tests', () =>
	gulp.src('tests/**/*.test.js')
		.pipe(mocha({
			compilers: "js:babel-core/register",
			require: "ignore-styles"
		}))
);
