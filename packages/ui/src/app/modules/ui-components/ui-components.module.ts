import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
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
