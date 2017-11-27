import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatDialogModule,
	MatIconModule,
	MatMenuModule,
	MatSidenavModule,
	MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import {
	SmartThingsApiToken,
	SmartThingsEndpoint
} from './app.values';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard, SmartThingsAuthGuard } from './guards';
import { UiComponentsModule } from './modules/ui-components/ui-components.module';
import { AuthService, IdentityService, KeycodeService, WebSocketService, SecuritySystemService } from './services';
import { ApiUrlToken, WsUrlToken } from './services/tokens';
import { TokenInterceptor } from './services/token.interceptor';
import { ConnectComponent } from './components/connect/connect.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		ConnectComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: () => {
					return localStorage.getItem('access_token');
				},
				whitelistedDomains: [
					'localhost:4200',
					'localhost:4567'
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

		UiComponentsModule
	],
	providers: [
		AuthGuard,
		AuthService,
		IdentityService,
		KeycodeService,
		SecuritySystemService,
		SmartThingsAuthGuard,
		WebSocketService,
		{
			provide: ApiUrlToken,
			useValue: 'http://localhost:4567'
		},
		{
			provide: SmartThingsApiToken,
			useValue: '34af7807-231d-4c28-8619-833784f1c3ff'
		},
		{
			provide: SmartThingsEndpoint,
			useValue: 'https://graph-na04-useast2.api.smartthings.com/api/smartapps/installations/5fb97cd9-f69e-4d0c-a705-fa5729921ee0'
		},
		{
			provide: WsUrlToken,
			useValue: 'ws://localhost:4567'
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
