import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import { NO_CONTENT, OK } from 'http-status-codes';
import * as redis from 'handy-redis';
import fetch, { RequestInit } from 'node-fetch';
import { callbackify } from 'util';


export type SecuritySystemStatus = 'armed' | 'arming' | 'disarmed' | 'disarming';

const client = redis.createHandyClient(6379, 'localhost');

async function isArmed() {
	const armed = await client.get('armed');

	if (armed === null) {
		await client.set('armed', 'false');
		return false;
	}

	return (armed === 'true');
}

export const arm: Handler = callbackify(
	async (event: APIGatewayEvent, context: Context) => {
		const body = JSON.parse(event.body || '{}');

		if (body.delay) {
			await updateStatus('arming');
			await startCountdown('arming', 30);
		}

		await client.set('armed', 'true');
		await updateStatus('armed');

		return {
			statusCode: NO_CONTENT
		};
	}
);

export const disarm: Handler = callbackify(
	async (event: APIGatewayEvent, context: Context) => {
		const body = JSON.parse(event.body || '{}');

		if (body.delay) {
			await updateStatus('disarming');
			await startCountdown('disarming', 30);
		}

		await client.set('armed', 'false');
		await updateStatus('disarmed');

		return {
			statusCode: NO_CONTENT
		};
	}
);

export const tryDisarm: Handler = callbackify(
	async (event: APIGatewayEvent, context: Context) => {
		const body = JSON.parse(event.body || '{}');

		await updateStatus('disarming');
		await startCountdown('disarming', 30);

		return {
			statusCode: NO_CONTENT
		};
	}
);

export const getStatus: Handler = callbackify(
	async (event: APIGatewayEvent, context: Context) => {
		const armed = await isArmed();

		return {
			statusCode: OK,
			contentType: 'application/json',
			body: JSON.stringify({
				data: armed ? 'armed' : 'disarmed'
			}),
		};
	}
);

export const refreshSensorStates = callbackify(
	async (event: APIGatewayEvent, context: Context) => {
		const options: RequestInit = {
			method: 'post',
			body: JSON.stringify({}),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		fetch(`${process.env.HOST}/security/refresh`, options)
			.catch(err => console.log(err));

		return {
			statusCode: NO_CONTENT
		};
	}
);

async function updateStatus(status: SecuritySystemStatus) {
	await client.set('status', status);

	const options: RequestInit = {
		method: 'put',
		body: JSON.stringify({ status: status }),
		headers: {
			'Content-Type': 'application/json'
		}
	};

	return fetch(`${process.env.HOST}/security/status`, options)
		.catch(err => console.log(err));
}

async function startCountdown(type: 'arming' | 'disarming' | 'intrusion', delay: number) {
	await fetch(`${process.env.HOST}/security/startCountdown`, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			type: 'arming',
			startTime: Date.now(),
			duration: delay
		})
	});

	return new Promise((resolve) => {
		setTimeout(resolve, delay * 1000);
	});
}
