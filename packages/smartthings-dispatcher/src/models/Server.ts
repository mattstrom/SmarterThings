import { Typegoose, arrayProp, prop } from 'typegoose';
import { SmartThingsToken } from './SmartThingsToken';


export class Server extends Typegoose {
	readonly _id: string;

	@prop({
		required: true,
		default: 'localhost:4567'
	})
	serverId: string;

	@prop({
		required: true,
		default: false
	})
	connected: boolean;

	@arrayProp({ items: SmartThingsToken })
	token: SmartThingsToken[] = [];

	@arrayProp({ items: String })
	clients: string[] = []
}

export const ServerModel = new Server().getModelForClass(Server);
