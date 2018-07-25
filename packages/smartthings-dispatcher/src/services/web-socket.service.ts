import { injectable, inject } from 'inversify';
import * as http from 'http';
import * as socketIo from 'socket.io';

import container from '../di/inversify.config';
import TYPES from '../di/types';
import { Socket, ServerModel } from '../models';


@injectable()
export class WebSocketService {
	private initialized: boolean = false;
	private io: SocketIO.Server;

	private sockets = new Map<string, WebSocket>();

	constructor(@inject(TYPES.ServerId) private serverId: string) {}

	initialize() {
		const server = container.get<http.Server>(TYPES.WebServer);

		this.io = socketIo(server, {
			path: '/ws'
		});

		this.io.on('connect', (socket: any) => {
			console.log('Connected client');

            socket.on('message', (m: any) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
		});

		this.initialized = true;
	}

	async send(data: any) {
		this.io.send(data);
		await Promise.resolve();
	}
}
