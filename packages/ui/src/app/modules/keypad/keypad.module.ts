import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { TokenInterceptor } from '../auth';
import { IdentityService, KeycodeService, SecuritySystemService } from './services';
import { UiComponentsModule } from '../ui-components';
import { ControlPadComponent } from './components/control-pad/control-pad.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { KeycodeDisplayComponent } from './components/keycode-display/keycode-display.component';
import { KeypadButtonComponent } from './components/keypad-button/keypad-button.component';
import { KeypadContainerComponent } from './components/keypad-container/keypad-container.component';
import { NumpadComponent } from './components/keypad/keypad.component';
import { SecuritySystemStatusComponent } from './components/security-system-status/security-system-status.component';
import { TimerPipe } from './pipes/timer.pipe';


const components = [
	ControlPadComponent,
	CountdownComponent,
	KeycodeDisplayComponent,
	KeypadButtonComponent,
	KeypadContainerComponent,
	NumpadComponent,
	SecuritySystemStatusComponent
];

@NgModule({
	declarations: [
		...components,
		TimerPipe
	],
	imports: [
		CommonModule,
		HttpClientModule,
		UiComponentsModule
	],
	exports: [
		...components,
		TimerPipe
	],
	providers: [
		IdentityService,
		KeycodeService,
		SecuritySystemService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	]
})
export class KeypadModule { }
