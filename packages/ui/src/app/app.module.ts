import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { PublicSideComponent } from './components/public-side/public-side.component';
import { AppComponent } from './app.component';
import { SecuredSideComponent } from './components/secured-side/secured-side.component';
import {
	AuthGuard,
	AuthModule,
	ConnectComponent,
	LoginComponent,
	RegisterComponent,
	SmartThingsAuthGuard, TokenInterceptor
} from './modules/auth';
import { SensorsService, WebSocketService } from './services';
import { UiComponentsModule } from './modules/ui-components';
import { IdentityService } from './services';
import { LoadingStatusInterceptor } from './services/loading-status.interceptor';
import { Sensors, KeycodeState, LoadingStatus, SecuritySystem, DeviceState } from './state';
import { tokenGetter } from './token-getter';
import { ApiUrlToken, WsUrlToken } from './tokens';


@NgModule({
	declarations: [
		AppComponent,
		PublicSideComponent,
		SecuredSideComponent
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
			DeviceState,
			LoadingStatus,
			SecuritySystem,
			KeycodeState,
			Sensors
		], { developmentMode: !environment.production }),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		// NgxsStoragePluginModule.forRoot(),
		RouterModule.forRoot([
			{
				path: '',
				redirectTo: '/home',
				pathMatch: 'full'
			},
			{
				path: '',
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
				path: 'home',
				loadChildren: './modules/home/home.module#HomeModule',
				canLoad: [AuthGuard],
				canActivate: [SmartThingsAuthGuard]
			},
			{
				path: 'settings',
				loadChildren: './modules/settings/settings.module#SettingsModule',
				canLoad: [AuthGuard],
				canActivate: [SmartThingsAuthGuard]
			},

		])
	],
	providers: [
		IdentityService,
		SensorsService,
		WebSocketService,
		{ provide: ApiUrlToken, useValue: environment.apiUrl },
		{ provide: WsUrlToken, useValue: environment.wsUrl },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoadingStatusInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
