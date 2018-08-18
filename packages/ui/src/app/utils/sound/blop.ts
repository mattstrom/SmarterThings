import { OscillatorGroup } from './oscillator-group';
import { Sound } from './sound';


const freq = 300;

export class Blop extends Sound {
	protected group: OscillatorGroup;

	constructor(context: AudioContext, volume: number = 0.1) {
		super(context, volume);

		const osc1 = this.context.createOscillator();
		osc1.type = 'sine';
		osc1.frequency.value = freq + 1;

		const osc2 = this.context.createOscillator();
		osc2.type = 'sine';
		osc2.frequency.value = freq - 1;

		this.group = new OscillatorGroup([osc1, osc2]);
		this.group.connect(this.context.destination);
	}
}
