import { INestApplicationContext } from '@nestjs/common';
import { CustomTransportStrategy } from '@nestjs/microservices';
import { Server, Socket } from 'net';
import * as net from 'net';
import * as repl from 'repl';

interface ReplOptions {
	context: INestApplicationContext;
}

export class ReplServer implements CustomTransportStrategy {
	private server: Server;

	constructor(private readonly options: ReplOptions) {
		this.init();
	}

	private init() {
		this.server = net.createServer((socket: Socket) => {
			const server = repl.start({
				prompt: '> ',
				input: socket,
				output: socket,
				useColors: true
			});

			(server.context as any).app = this.options.context;
			(server.context as any).db = this.options.context.get('EntityManager');
		});
	}

	listen(callback: () => void) {
		this.server.listen(5001, callback);
	}

	close() {
		if (this.server && this.server.listening) {
			this.server.close(() => {
				// this.logger.info('REPL server disconnected');
			});
		}
	}
}
