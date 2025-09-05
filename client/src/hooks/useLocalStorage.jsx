import { useState } from "react";

export function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	});

	const setStoredValue = (val) => {
		const valueToStore = val instanceof Function ? val(value) : val;
		setValue(valueToStore);
		localStorage.setItem(key, JSON.stringify(valueToStore));
	};

	return [value, setStoredValue];
}
