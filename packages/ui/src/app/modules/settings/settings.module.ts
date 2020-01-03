import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiComponentsModule } from '../ui-components';
import { SensorsComponent } from './components/sensors/sensors.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsGridComponent } from './components/settings-grid/settings-grid.component';
import { UsersComponent } from './components/users/users.component';


@NgModule({
	declarations: [
		SensorsComponent,
		SettingsComponent,
		SettingsGridComponent,
		UsersComponent
	],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule.forChild([
			{
				path: '',
				component: SettingsComponent,
				children: [
					{
						path: '',
						component: SettingsGridComponent
					},
					{
						path: 'sensors',
						component: SensorsComponent
					},
					{
						path: 'users',
						component: UsersComponent
					}
				]
			}
		]),
		UiComponentsModule
	]
})
export class SettingsModule {}
