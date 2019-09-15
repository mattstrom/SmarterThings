declare interface BatteryManager {
	level: number;
}

declare interface Navigator {
	getBattery(): Promise<BatteryManager>;
}
