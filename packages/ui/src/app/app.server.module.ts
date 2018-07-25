import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';


@NgModule({
	declarations: [AppShellComponent],
	imports: [
		AppModule,
		ServerModule,
		RouterModule.forRoot([{
			path: 'shell',
			component: AppShellComponent
		}]),
	],
	bootstrap: [AppComponent],
})
export class AppServerModule {}
