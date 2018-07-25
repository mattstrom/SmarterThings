import { createParamDecorator } from '@nestjs/common';
import * as express from 'express';

export const Cookie = createParamDecorator((name: string, req: express.Request) => {
	return req.cookies[name];
});
