import * as gulp from 'gulp';
import { Gulpclass, Task } from 'gulpclass';
import * as merge from 'merge2';
import * as sourcemaps from 'gulp-sourcemaps';
import * as tsc from 'gulp-typescript';


@Gulpclass()
export class Gulpfile {
	tsProject: tsc.Project;

	constructor() {
		this.tsProject = tsc.createProject('./tsconfig.json');
	}

	@Task('build-support')
	buildSupport() {
		const tsResult = gulp.src('support/**/*.ts', { base: '.' })
			.pipe(sourcemaps.init())
			.pipe(this.tsProject());

		console.log('here');

		return merge([
			tsResult.js
				.pipe(sourcemaps.write('./', {
					includeContent: false,
					sourceRoot: (file) => {
						return '../'.repeat(file.relative.split('/').length) + 'src';
					}
				}))
				.pipe(gulp.dest('.'))
		]);
	}
}
