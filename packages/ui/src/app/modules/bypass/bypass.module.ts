import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiComponentsModule } from '../ui-components';
import { SensorListItemComponent } from './components/sensor-list-item/sensor-list-item.component';
import { SensorListComponent } from './components/sensor-list/sensor-list.component';
import { BypassComponent } from './components/bypass/bypass.component';
import { BypassedListComponent } from './components/bypassed-list/bypassed-list.component';
import { BypassedBadgeComponent } from './components/bypassed-badge/bypassed-badge.component';


@NgModule({
	declarations: [
		BypassComponent,
		BypassedBadgeComponent,
		BypassedListComponent,
		SensorListComponent,
		SensorListItemComponent
	],
	imports: [
		CommonModule,
		UiComponentsModule
	],
	exports: [
		BypassComponent,
		BypassedBadgeComponent,
		SensorListComponent,
		SensorListItemComponent
	]
})
export class BypassModule {}
