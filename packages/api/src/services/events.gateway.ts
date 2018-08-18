import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, NestGateway } from '@nestjs/websockets';

import { logger } from '../modules/logging/winston';


@WebSocketGateway({ path: '/ws' })
export class EventsGateway implements NestGateway {
	@WebSocketServer() server;

	constructor() {}

	afterInit() {
		logger.info('Gateway connected');
	}

	handleConnection() {
		logger.info('Connected client');
	}

	handleDisconnect() {
		logger.info('Client disconnected');
	}

	@SubscribeMessage('message')
	onEvent(client, data): WsResponse<any> {
		logger.info('[server](message): %s', JSON.stringify(data));

		return {
			event: 'message',
			data
		};
	}

	async send(data: any) {
		this.server.send(data);
		await Promise.resolve();
	}
}
