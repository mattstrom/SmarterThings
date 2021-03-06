import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UiComponentsModule } from '../ui-components';
import { ConnectComponent, LoginComponent, RegisterComponent } from './components';
import { AuthGuard, SmartThingsAuthGuard } from './guards';
import { TokenInterceptor } from './index';
import { AuthService } from './services';


@NgModule({
	declarations: [
		ConnectComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		UiComponentsModule
	],
	exports: [
		ConnectComponent,
		LoginComponent,
		RegisterComponent
	],
	providers: [
		AuthGuard,
		AuthService,
		SmartThingsAuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	]
})
export class AuthModule {}
