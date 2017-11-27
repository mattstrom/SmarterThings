import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatDialogModule,
	MatIconModule,
	MatInputModule,
	MatMenuModule,
	MatProgressSpinnerModule,
	MatSidenavModule,
	MatToolbarModule
} from '@angular/material';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,

		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatToolbarModule
	],
	exports: [
		MatButtonModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatToolbarModule
	]
})
export class UiComponentsModule { }
