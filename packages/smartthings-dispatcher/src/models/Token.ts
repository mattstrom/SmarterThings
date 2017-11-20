import { prop } from 'typegoose';


export class Token {
	@prop({ required: true })
	access: string;

	@prop({ required: true })
	token: string;
}
