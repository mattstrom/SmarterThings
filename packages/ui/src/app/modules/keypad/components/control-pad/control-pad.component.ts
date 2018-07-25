import { Component } from '@angular/core';
import { KeycodeService, SecuritySystemService } from '../../services';


@Component({
	selector: 'control-pad',
	templateUrl: './control-pad.component.html',
	styleUrls: ['./control-pad.component.scss']
})
export class ControlPadComponent {

	constructor(
		private keycodeService: KeycodeService,
		private securitySystem: SecuritySystemService
	) { }

	onArm = () => {
		this.securitySystem.arm();
	}

	onDisarm = () => {
		this.securitySystem.disarm();
	}

	onClear = () => {
		this.keycodeService.clearCode();
	}
}
