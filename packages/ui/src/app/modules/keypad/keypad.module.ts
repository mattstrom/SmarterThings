import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from '../auth';

import { IdentityService, KeycodeService, SecuritySystemService, WebSocketService } from './services';
import { UiComponentsModule } from '../ui-components';
import { ControlPadComponent } from './components/control-pad/control-pad.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { KeycodeDisplayComponent } from './components/keycode-display/keycode-display.component';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';
import { KeypadContainerComponent } from './components/keypad-container/keypad-container.component';
import { NumpadComponent } from './components/keypad/keypad.component';
import { SecuritySystemStatusComponent } from './components/security-system-status/security-system-status.component';


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
		HttpClientModule,
		RouterModule.forChild([
			{
				path: '',
				component: KeypadContainerComponent
			}
		]),

		UiComponentsModule
	],
	providers: [
		IdentityService,
		KeycodeService,
		SecuritySystemService,
		WebSocketService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	]
})
export class KeypadModule { }
