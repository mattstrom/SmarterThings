import { prop } from 'typegoose';


export class SmartThingsToken {
	@prop({ required: true })
	accessUrl: string;

	@prop({ required: true })
	authToken: string;
}
