import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { WsUrlToken } from './tokens';


export interface Message {
	action: string;
}

@Injectable()
export class WebSocketService {
	public socket: Subject<MessageEvent>;

	constructor(@Inject(WsUrlToken) private wsUrl: string) {
		this.connect(this.wsUrl);
	}

	connect(url) {
		if (!this.socket) {
			this.socket = this.create(url);
		}

		return this.socket;
	}

	private create(url): Subject<MessageEvent> {
		const ws = new WebSocket(url);
		const observable = Observable.create(
			(obs: Observer<MessageEvent>) => {
				ws.onmessage = (event: MessageEvent) => {
					obs.next(JSON.parse(event.data));
				};
				ws.onerror = (event: MessageEvent) => {
					obs.error(event);
				};
				ws.onclose = (event: CloseEvent) => {
					obs.complete();
				};

				return () => {
					ws.close();
				};
			}
		);

		const observer = {
			next: (data: Object) => {
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(JSON.stringify(data));
				}
			},
		};

		return Subject.create(observer, observable);
	}
}
