export function propertyComparer<T>(name: keyof T) {
	return (a: T, b: T) =>
		a[name] < b[name]
			? -1
			: (a[name] > b[name])
			? 1
			: 0;
}

export function sortBy<T>(items: T[], propertyName: keyof T): T[] {
	return [...items].sort(propertyComparer(propertyName));
}
