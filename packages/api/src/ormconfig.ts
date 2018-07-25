export = {
	type: 'mongodb',
	host: process.env.TYPEORM_HOST || 'localhost',
	port: 27017,
	database: 'smarterthings',
	entities: [
		__dirname + '/../**/*.entity{.ts,.js}',
	],
	synchronize: true,
};
