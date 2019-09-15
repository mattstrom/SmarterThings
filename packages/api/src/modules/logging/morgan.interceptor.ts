import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import morgan, { Morgan } from 'morgan';
import { Observable } from 'rxjs';

import { MorganProvider } from './tokens';
import { logger } from './winston';


@Injectable()
export class MorganInterceptor implements NestInterceptor {
	protected readonly options: morgan.Options;
	protected readonly format: string | morgan.FormatFn;

	constructor(@Inject(MorganProvider) private morganInstance: Morgan) {
		this.format = 'combined';
		this.options = {
			stream: {
				write(message: string): void {
					/* Uses the 'info' log level so the output will be picked
		             * up by both transports (file and console). */
					logger.info(message.trim());
				}
			}
		};
	}

	intercept(
		context: ExecutionContext,
		next: CallHandler
	): Observable<any> {
		const httpRequest = context.switchToHttp().getRequest();
		const httpResponse = context.switchToHttp().getResponse();

		const handler = (typeof this.format === 'string')
			? this.morganInstance(this.format, this.options)
			: this.morganInstance(this.format, this.options);

		handler(httpRequest, httpResponse, console.error);

		return next.handle();
	}
}
