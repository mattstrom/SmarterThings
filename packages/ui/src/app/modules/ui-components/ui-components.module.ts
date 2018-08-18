import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatDialogModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatSidenavModule,
	MatToolbarModule
} from '@angular/material';

import { ToolbarComponent, ToolbarProgressBarComponent } from './components';


const MaterialComponents = [
	MatButtonModule,
	MatDialogModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatSidenavModule,
	MatToolbarModule
];

@NgModule({
	declarations: [
		ToolbarComponent,
		ToolbarProgressBarComponent
	],
	imports: [
		CommonModule,
		...MaterialComponents
	],
	exports: [
		ToolbarComponent,
		ToolbarProgressBarComponent,
		...MaterialComponents
	]
})
export class UiComponentsModule { }
