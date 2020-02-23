export interface Forecast {
	cod: string;
	message: number;
	cnt: number;
	list: List[];
	city: City;
}

export interface City {
	name: string;
	coord: Coord;
	country: string;
	timezone: number;
	sunrise: number;
	sunset: number;
}

export interface Coord {
	lat: number;
	lon: number;
}

export interface List {
	dt: number;
	main: MainClass;
	weather: Weather[];
	clouds: Clouds;
	wind: Wind;
	sys: Sys;
	dt_txt: string;
	rain?: Rain;
}

export interface Clouds {
	all: number;
}

export interface MainClass {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	sea_level: number;
	grnd_level: number;
	humidity: number;
	temp_kf: number;
}

export interface Rain {
	'3h': number;
}

export interface Sys {
	pod: Pod;
}

export enum Pod {
	D = 'd',
	N = 'n',
}

export interface Weather {
	id: number;
	main: MainEnum;
	description: Description;
	icon: string;
}

export enum Description {
	BrokenClouds = 'broken clouds',
	ClearSky = 'clear sky',
	FewClouds = 'few clouds',
	LightRain = 'light rain',
	OvercastClouds = 'overcast clouds',
	ScatteredClouds = 'scattered clouds',
}

export enum MainEnum {
	Clear = 'Clear',
	Clouds = 'Clouds',
	Rain = 'Rain',
}

export interface Wind {
	speed: number;
	deg: number;
}
