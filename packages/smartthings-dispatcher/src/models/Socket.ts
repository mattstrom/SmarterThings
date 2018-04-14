import { Typegoose, prop } from 'typegoose';


export class Socket extends Typegoose {
	_id: string;

	@prop({
		required: true
	})
	clientId: string;

	@prop()
	connectedAt: Date;

	@prop()
	lastHeartbeat: Date;

	@prop()
	disconnectedAt: Date;
}

export const SocketModel = new Socket().getModelForClass(Socket);
