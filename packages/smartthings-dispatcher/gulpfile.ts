import { Gulpclass, Task } from 'gulpclass';
import * as clean from 'gulp-clean';
import * as gulp from 'gulp';
import * as merge from 'merge2';
import * as path from 'path';
import * as sass from 'gulp-sass';
import * as sourcemaps from 'gulp-sourcemaps';
import * as tsc from 'gulp-typescript';


@Gulpclass()
export class Gulpfile {
	tsProject: tsc.Project;

	constructor() {
		this.tsProject = tsc.createProject('tsconfig.json');
	}

	@Task()
	clean() {
		return gulp.src('dist', { read: false })
			.pipe(clean());
	}

	@Task()
	compile() {
		const tsResult = gulp.src('src/**/*.ts')
			.pipe(sourcemaps.init())
			.pipe(this.tsProject());

		return merge([
			tsResult.js
				.pipe(sourcemaps.write('./', {
					includeContent: false,
					sourceRoot: '../src'
				}))
				.pipe(gulp.dest('./dist'))

		]);
	}

	@Task()
	sass() {
		return gulp.src('src/**/*.scss', { base: './src' })
			.pipe(sass())
			.pipe(gulp.dest('dist'));
	}

	@Task('copy-assets')
	copyAssets() {
		return gulp
			.src([
				'src/public/**/*.css',
				'src/public/**/*.png',
				'src/public/**/*.svg',
			], { base: './src' })
			.pipe(gulp.dest('dist'));
	}

	@Task('copy-views')
	copyViews() {
		return gulp.src('src/views/**/*.hbs', { base: './src' })
			.pipe(gulp.dest('dist'));
	}

	@Task('build', ['compile', 'sass', 'copy-assets', 'copy-views'])
	build() { }

	@Task('watch')
	watch() {
		gulp.watch('src/public/**/*', ['copy-assets']);
		gulp.watch('src/**/*.hbs', ['copy-views']);
		gulp.watch('src/**/*.scss', ['sass']);
		gulp.watch('src/**/*.ts', ['compile']);
	}
}
