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
import { ApiUrlToken, SmartThingsApiToken, SmartThingsEndpoint, WsUrlToken } from './tokens';
import * as fromLoadingStatus from './store/loading-status/loading-status.reducer';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({appId: 'serverApp'}),
		BrowserAnimationsModule,
		AuthModule,
		UiComponentsModule,
		ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
		JwtModule.forRoot({
			config: {
				tokenGetter: () => {
					return localStorage.getItem('accessToken');
				},
				whitelistedDomains: [
					'localhost:4200',
					'localhost:4567',
					'localhost',
					'home.mattstrom.com:4200',
					'home.mattstrom.com:4567',
					'home.mattstrom.com'
				]
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
		{
			provide: ApiUrlToken,
			useValue: environment.apiUrl
		},
		{
			provide: SmartThingsApiToken,
			useValue: environment.smartthings.apiToken
		},
		{
			provide: SmartThingsEndpoint,
			useValue: environment.smartthings.endpoint
		},
		{
			provide: WsUrlToken,
			useValue: environment.wsUrl
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
