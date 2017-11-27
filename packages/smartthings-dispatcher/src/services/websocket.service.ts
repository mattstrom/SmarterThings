import { injectable, inject } from 'inversify';
import * as http from 'http';
import * as url from 'url';
import * as WebSocket from 'ws';

import container from '../di/inversify.config';
import TYPES from '../di/types';
import { SocketModel } from '../models';


@injectable()
export class WebSocketService {
	private initialized: boolean = false;
	private wss: WebSocket.Server;

	private sockets = new Map<number, WebSocket>();
	private count: number = 1;

	constructor() {}

	initialize() {
		const server = container.get<http.Server>(TYPES.WebServer);

		this.wss = new WebSocket.Server({ server: server });
		this.wss.on('connection', (socket: WebSocket, req: http.IncomingMessage) => {
			this.sockets.set(this.count, socket);

			const location = url.parse(req.url, true);
			console.log(`Client connection opened: ${this.count}`);

			socket.on('message', (event) => {
				console.log('Received message from client', event);

				socket.send('Hello travler');
			});

			socket.on('disconnect', () => {
				console.log('Received message from client', event);
				this.count -= 1;
			});

			this.count += 1;
		});

		this.initialized = true;
	}

	async send(data: any): Promise<void> {
		if (!this.initialized) {
			this.initialize();
		}

		if (this.sockets.size === 0) {
			throw new Error('No connections have not been initialized.');
		}

		const socket = this.sockets.get(1);

		return new Promise<void>((resolve, reject) => {
			const payload = JSON.stringify(data);

			socket.send(payload, (err: Error) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
}
