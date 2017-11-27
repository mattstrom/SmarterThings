import { ContainerModule, interfaces } from 'inversify';

import TYPES from '../../di/types';
import { AuthService } from './auth.service';


export const AuthModule = new ContainerModule(
	(bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
		bind<AuthService>(TYPES.AuthService).to(AuthService);
    }
);
