import { Typegoose, prop } from "typegoose";


export class OAuthGrant extends Typegoose {
	_id: string;

	@prop({
		required: true
	})
	identity: string;

	@prop({
		required: true
	})
	accessUrl: string;

	@prop({})
	authToken: string;
}

export const OAuthGrantModel = new OAuthGrant().getModelForClass(OAuthGrant);
