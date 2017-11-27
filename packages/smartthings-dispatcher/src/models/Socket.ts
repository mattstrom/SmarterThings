import { Typegoose, prop } from "typegoose";


export class Socket extends Typegoose {
	_id: string;

	@prop({
		required: true
	})
	identity: string;

	@prop()
	connectedAt: Date;

	@prop()
	disconnectedAt: Date;
}

export const SocketModel = new Socket().getModelForClass(Socket);
