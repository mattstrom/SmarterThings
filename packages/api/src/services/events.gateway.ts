import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, NestGateway } from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway({ path: '/ws' })
export class EventsGateway implements NestGateway {
	@WebSocketServer() server;

	afterInit() {
		console.log('Gateway connected');
	}

	handleConnection() {
		console.log('Connected client');
	}

	handleDisconnect() {
		console.log('Client disconnected');
	}

	@SubscribeMessage('message')
	onEvent(client, data): WsResponse<any> {
		console.log('[server](message): %s', JSON.stringify(data));

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
