import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { PublicSideComponent } from './components/public-side/public-side.component';
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
import { IdentityService } from './services';
import { LoadingStatus } from './state';
import { tokenGetter } from './token-getter';
import { ApiUrlToken, WsUrlToken } from './tokens';


@NgModule({
	declarations: [
		AppComponent,
		PublicSideComponent
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
		NgxsModule.forRoot([
			LoadingStatus
		]),
		RouterModule.forRoot([
			{
				path: '',
				redirectTo: '/keypad',
				pathMatch: 'full'
			},
			{
				path: '',
				component: PublicSideComponent,
				children: [
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
					}
				]
			},
			{
				path: 'keypad',
				loadChildren: './modules/keypad/keypad.module#KeypadModule',
				canLoad: [AuthGuard],
				canActivate: [SmartThingsAuthGuard]
			}
		])
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
