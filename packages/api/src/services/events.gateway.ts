import { Inject, Logger } from '@nestjs/common';
import {
	OnGatewayConnection, OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsResponse
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NestLogger } from '../modules/logging';


@WebSocketGateway({ path: '/ws' })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
	@WebSocketServer()
	server: Server;

	constructor(@Inject(NestLogger) private logger: Logger) {}

	afterInit(server: any) {
		this.logger.log('Gateway connected');
	}

	handleConnection(client: any) {
		this.logger.log('Connected client');
	}

	handleDisconnect(client: any) {
		this.logger.log('Client disconnected');
	}

	@SubscribeMessage('message')
	onEvent(client, data): WsResponse<any> {
		this.logger.log('[server](message): %s', JSON.stringify(data));

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
