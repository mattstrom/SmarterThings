import { createLogger, transports } from 'winston';


const consoleOptions: any = {
	level: (process.env.NODE_ENV === 'production') ? 'info' : 'debug',
	handleExceptions: true
};

export const logger = createLogger({
	transports: [
		new transports.Console(consoleOptions)
	],
	exitOnError: false
});
