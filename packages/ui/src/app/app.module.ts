import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { JwtModule } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import {
	AuthGuard,
	AuthModule,
	ConnectComponent,
	LoginComponent,
	RegisterComponent,
	SmartThingsAuthGuard
} from './modules/auth';
import { WebSocketService } from './modules/keypad/services';
import { UiComponentsModule } from './modules/ui-components';
import { reducers, metaReducers } from './store';
import { IdentityService } from './services';
import * as fromLoadingStatus from './store/loading-status/loading-status.reducer';
import { tokenGetter } from './token-getter';
import { ApiUrlToken, WsUrlToken } from './tokens';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({appId: 'serverApp'}),
		BrowserAnimationsModule,
		AuthModule,
		UiComponentsModule,
		ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
		JwtModule.forRoot({
			config: {
				tokenGetter,
				whitelistedDomains: environment.whitelistedDomains
			}
		}),
		RouterModule.forRoot([
			{
				path: '',
				redirectTo: '/keypad',
				pathMatch: 'full'
			},
			{
				path: 'connect',
				component: ConnectComponent,
				canActivate: [AuthGuard]
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'register',
				component: RegisterComponent
			},
			{
				path: 'keypad',
				loadChildren: './modules/keypad/keypad.module#KeypadModule',
				canLoad: [AuthGuard],
				canActivate: [SmartThingsAuthGuard]
			}
		]),
		StoreModule.forRoot(reducers, { metaReducers }),
		StoreModule.forFeature('loadingStatus', fromLoadingStatus.reducer)
	],
	providers: [
		IdentityService,
		WebSocketService,
		{ provide: ApiUrlToken, useValue: '/api' },
		{ provide: WsUrlToken, useValue: `ws://${location.host}` }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
