import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UiComponentsModule } from '../ui-components/ui-components.module';


@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'register',
				component: RegisterComponent
			}
		]),

		UiComponentsModule
	],
	exports: [
		LoginComponent
	]
})
export class AuthModule {}
