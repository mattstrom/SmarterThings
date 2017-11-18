import { NgModule, OpaqueToken } from '@angular/core';
import { HttpModule } from '@angular/http';
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

import { AppComponent } from './app.component';
import { KeycodeService } from './services/keycode.service';
import {
	SmartThingsApiToken,
	SmartThingsEndpoint
} from './app.values';
import { SmartThingsAuthGuard } from './guards';
import { UiComponentsModule } from './modules/ui-components/ui-components.module';
import { IdentityService, WebSocketService, SecuritySystemService } from './services';
import { ApiUrlToken, WsUrlToken } from './services/tokens';


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpModule,
		RouterModule.forRoot([
			{
				path: 'auth',
				loadChildren: './modules/auth/auth.module#AuthModule'
			},
			{
				path: 'keypad',
				loadChildren: './modules/keypad/keypad.module#KeypadModule',
				canActivate: [SmartThingsAuthGuard]
			}
		]),

		UiComponentsModule
	],
	providers: [
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
