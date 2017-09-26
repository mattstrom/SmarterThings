import * as ProxyMiddleware from 'http-proxy-middleware';

import container from '../di/inversify.config';
import TYPES from '../di/types';
import { AuthService } from '../services';


const authService = container.get<AuthService>(TYPES.AuthService);

const config: ProxyMiddleware.Config = {
	changeOrigin: true,
	target: 'https://graph-na04-useast2.api.smartthings.com/api/smartapps/installations/7ad90eed-abeb-4a64-80ce-3eef9157c720',
	//target: 'https://graph.api.smartthings.com//api/smartapps/installations/23a9abd4-4c59-42ce-b9f7-537f8a1c5979',
	hostRewrite: (path, req) => {
		return 'https://graph-na04-useast2.api.smartthings.com/api/smartapps/installations/7ad90eed-abeb-4a64-80ce-3eef9157c720';
	},
	pathRewrite: (path, req) => {
		return path.replace(/^\/proxy/, '/switches');
	},
	onProxyReq: (proxyReq, req, res) => {
		proxyReq.setHeader('Authorization', `Bearer ea93eff7-3099-4de8-a679-614bb447081d`);
		//proxyReq.setHeader('Authorization', `Bearer: ${authService.get()}`);

		// Write out body changes to the proxyReq stream
		proxyReq.write('{}');
		proxyReq.end();
	}
};

const proxy = ProxyMiddleware(config);

export default proxy;
