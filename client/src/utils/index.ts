// turns a string into a slug
// useful for for article titles
export function getSlug(str: string): string | void {
	if (!str) return;
	if (typeof str === 'string') {
		const tempString = str
			.replaceAll(/[^a-zA-Z0-9]/g, '-')
			.toLowerCase()
			.substring(0, 50);
		return tempString.replace(/-+/g, '-').replace(/-$/, '');
	}
}

// truncating a string if it's too long
export function truncate(str: string): string {
	return str && str.length > 145 ? str.substring(0, 145) + '...' : str;
}

// turning date into a readable thing
export const publishedDate = (d: any) => {
	const date = new Date(d);

	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
		hour12: false,
	};

	return date.toLocaleString('en-GB', options);
};

export const createPath = (arr: string[]) => {
	if (!arr.every(s => typeof s === "string")) return;
	return arr.join("/");
};
