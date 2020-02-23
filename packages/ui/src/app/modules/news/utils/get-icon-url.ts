export function getIconUrl(code: string, large: boolean = false) {
	const size = large ? `@2x` : '';
	return `https://openweathermap.org/img/wn/${code}${size}.png`;
}
