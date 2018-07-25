const TYPES = {
	AuthService: Symbol('AuthService'),
	ClientId: Symbol('ClientId'),
	ClientSecret: Symbol('ClientSecret'),
	Mode: Symbol('Mode'),
	MongoHost: Symbol('MongoHost'),
	MongoConnectionUri: Symbol('MongoConnectionUri'),
	MongoDB: Symbol('MongoDB'),
	Mongoose: Symbol('Mongoose'),
	OAuthModuleOptions: Symbol('OAuthModuleOptions'),
	RedirectUrl: Symbol('RedirectUrl'),
	Secret: Symbol('Secret'),
	ServerId: Symbol('ServerId'),
	TokenHost: Symbol('TokenHost'),
	WebServer: Symbol('WebServer'),
	WebSocketService: Symbol('WebSocketService')
};

export const OAuthTypes = {
	OAuthEndpointUrl: Symbol('OAuthEndpointUrl'),
	OAuthModuleOptions: Symbol('OAuthModuleOptions'),
	OAuthRedirectUrl: Symbol('OAuthRedirectUrl')
};

export default TYPES;
