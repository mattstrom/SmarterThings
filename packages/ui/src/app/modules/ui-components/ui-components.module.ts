import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	MatBadgeModule,
	MatButtonModule,
	MatCardModule,
	MatDialogModule, MatDividerModule, MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatSidenavModule, MatSlideToggleModule, MatTableModule,
	MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDoorOpen, faUnlock, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

import { ToolbarComponent, ToolbarProgressBarComponent } from './components';
import { PanelComponent } from './components/panel/panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { SilentButtonComponent } from './components/silent-button/silent-button.component';


const MaterialComponents = [
	MatBadgeModule,
	MatButtonModule,
	MatCardModule,
	MatDialogModule,
	MatDividerModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatMenuModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatSidenavModule,
	MatSlideToggleModule,
	MatTableModule,
	MatToolbarModule
];


library.add(faDoorOpen, faUnlock, faVolumeMute);

@NgModule({
	declarations: [
		FooterComponent,
		PanelComponent,
		SilentButtonComponent,
		ToolbarComponent,
		ToolbarProgressBarComponent
	],
	imports: [
		CommonModule,
		FontAwesomeModule,
		RouterModule,
		...MaterialComponents
	],
	exports: [
		FaIconComponent,
		FooterComponent,
		PanelComponent,
		SilentButtonComponent,
		ToolbarComponent,
		ToolbarProgressBarComponent,
		...MaterialComponents
	]
})
export class UiComponentsModule { }
