import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NumpadComponent } from './components/keypad/keypad.component';
import { KeycodeDisplayComponent } from './components/keycode-display/keycode-display.component';
import { KeycodeService } from '../../services/keycode.service';


import { KeypadContainerComponent } from './components/keypad-container/keypad-container.component';
import { ControlPadComponent } from './components/control-pad/control-pad.component';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';
import { SmartThingsAuthGuard } from '../../guards';
import { IdentityService, WebSocketService, SecuritySystemService } from '../../services';
import { ApiUrlToken, WsUrlToken } from '../../services/tokens';
import { CountdownComponent } from './components/countdown/countdown.component';
import { SecuritySystemStatusComponent } from './components/security-system-status/security-system-status.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';
import { SmartThingsApiToken, SmartThingsEndpoint } from '../../app.values';


@NgModule({
	declarations: [
		NumpadComponent,
		KeycodeDisplayComponent,
		KeypadContainerComponent,
		ControlPadComponent,
		KeypadButtonComponent,
		CountdownComponent,
		SecuritySystemStatusComponent
	],
	imports: [
		CommonModule,
		HttpModule,
		RouterModule.forChild([
			{
				path: '',
				component: KeypadContainerComponent
			}
		]),

		UiComponentsModule
	],
	providers: [
		// IdentityService,
		// KeycodeService,
		// SecuritySystemService,
		// SmartThingsAuthGuard,
		// WebSocketService,
		// {
		// 	provide: ApiUrlToken,
		// 	useValue: 'http://localhost:4567'
		// },
		// {
		// 	provide: SmartThingsApiToken,
		// 	useValue: '34af7807-231d-4c28-8619-833784f1c3ff'
		// },
		// {
		// 	provide: SmartThingsEndpoint,
		// 	useValue: 'https://graph-na04-useast2.api.smartthings.com/api/smartapps/installations/5fb97cd9-f69e-4d0c-a705-fa5729921ee0'
		// },
		// {
		// 	provide: WsUrlToken,
		// 	useValue: 'ws://localhost:4567'
		// }
	]
})
export class KeypadModule { }
