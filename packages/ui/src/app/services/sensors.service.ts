import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { WebSocketService } from '../services';
import { GetSensors } from '../state';


@Injectable({ providedIn: 'root' })
export class SensorsService {

	constructor(
		private store: Store,
		private webSocketService: WebSocketService
	) {
		this.webSocketService.message$
			.subscribe((message) => {
				this.handleMessage(message);
			});
	}

	refresh() {
		this.store.dispatch(new GetSensors());
	}

	private handleMessage(message) {
		switch (message.action) {
			case 'refresh': {
				this.refresh();
				break;
			}
			default: {
				break;
			}
		}
	}
}
