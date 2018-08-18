import { OscillatorGroup } from './oscillator-group';

export abstract class Sound {
	protected context: AudioContext;
	protected volume: GainNode;

	protected abstract group: OscillatorGroup;

	constructor(context: AudioContext, volume: number = 0.1) {
		this.context = context;
		this.volume = this.context.createGain();
		this.volume.gain.value = volume;
	}

	start(duration?: number) {
		const time = this.context.currentTime;
		this.group.start(time);
		this.volume.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);

		if (duration) {
			this.stop(time + duration);
		}
	}

	stop(when?: number) {
		this.group.stop(when);
	}
}
