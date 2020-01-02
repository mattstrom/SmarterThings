import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { IdentityService } from '../../services';
import { TokenInterceptor } from '../auth';
import { BypassModule } from '../bypass/bypass.module';
import { KeypadModule } from '../keypad';
import { SecuritySystemService } from '../keypad/services';
import { NewsModule } from '../news/news.module';
import { UiComponentsModule } from '../ui-components';
import { HomeComponent } from './components/home/home.component';
import { ArmControlsComponent } from './components/arm-controls/arm-controls.component';
import { DisarmControlsComponent } from './components/disarm-controls/disarm-controls.component';
import { QuickExitButtonComponent } from './components/quick-exit-button/quick-exit-button.component';
import { DisarmButtonComponent } from './components/disarm-button/disarm-button.component';
import { DashboardState } from './state';
import { ArmButtonComponent } from './components/arm-button/arm-button.component';


@NgModule({
	declarations: [
		ArmButtonComponent,
		ArmControlsComponent,
		HomeComponent,
		DisarmControlsComponent,
		QuickExitButtonComponent,
		DisarmButtonComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxsModule.forFeature([
			DashboardState
		]),
		RouterModule.forChild([
			{
				path: '',
				component: HomeComponent
			}
		]),

		BypassModule,
		KeypadModule,
		NewsModule,
		UiComponentsModule
	],
	providers: [
		IdentityService,
		SecuritySystemService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	]
})
export class HomeModule { }
