import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiComponentsModule } from '../ui-components';
import { SettingsComponent } from './components/settings/settings.component';
import { UsersComponent } from './components/users/users.component';


@NgModule({
	declarations: [
		SettingsComponent,
		UsersComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule.forChild([
			{
				path: '',
				component: SettingsComponent
			},
			{
				path: 'users',
				component: UsersComponent
			}
		]),

		UiComponentsModule
	]
})
export class SettingsModule {}
