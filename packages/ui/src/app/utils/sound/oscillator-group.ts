export class OscillatorGroup {
	private readonly oscillators: OscillatorNode[] = [];

	constructor(oscillators: OscillatorNode[]) {
		this.oscillators = oscillators;
	}

	connect(destination: AudioNode, output?: number);
	connect(destination: AudioNode, output?: number, input?: number) {
		this.oscillators.forEach(osc => {
			osc.connect(destination, output, input);
		});
	}

	disconnect(destination: AudioNode, output?: number);
	disconnect(destination: AudioNode, output?: number, input?: number) {
		this.oscillators.forEach(osc => {
			osc.disconnect(destination, output, input);
		});
	}

	start(when?: number) {
		this.oscillators.forEach(osc => {
			osc.start(when);
		});
	}

	stop(when?: number) {
		this.oscillators.forEach(osc => {
			osc.stop(when);
		});
	}
}
