
export enum SensorType {
	Contact = 'contact',
	Motion = 'motion'
}

export interface Sensor {
	type: SensorType;
	name: string;
	value: string;
	bypassed: boolean;
}
