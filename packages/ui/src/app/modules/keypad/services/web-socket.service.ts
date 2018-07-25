import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as socketIo from 'socket.io-client';

import { WsUrlToken } from '../../../tokens';
import { Message } from '../models';


export enum Event {
	Connect = 'connect',
	Disconnect = 'disconnect'
}

@Injectable()
export class WebSocketService {
	private socket: SocketIOClient.Socket;

	private _events = Object.freeze({
		[Event.Connect]: new Subject<void>(),
		[Event.Disconnect]: new Subject<void>()
	});

	get events() {
		return this._events;
	}

	private _message$ = new Subject<Message>();
	get message$() {
		return this._message$;
	}

	constructor(@Inject(WsUrlToken) private wsUrl: string) {
		this.initalize();
	}

	initalize() {
		if (!this.socket) {
			this.socket = socketIo(this.wsUrl, {
				path: '/ws'
			});
		}

		this.socket.on('message', (data: Message) => {
			this.message$.next(data);
		});

		this.socket.on(Event.Connect, () => {
			this.events[Event.Connect].next();
		});

		this.socket.on(Event.Disconnect, () => {
			this.events[Event.Disconnect].next();
		});
	}

	send(message: Message) {
		this.socket.emit('message', message);
	}
}
