import { GlobalRef } from "../global-ref";

export async function apiCache<T>(
	keyName: string,
	fetchData: () => Promise<T>,
	cacheTime = 1000 * 60 * 5,
) {
	const cachedValue = new GlobalRef<T>(keyName + ".cached.value");
	const cachedDate = new GlobalRef<number>(keyName + ".cached.date");

	const date = Date.now();

	if (cachedValue.value == null || date > cachedDate.value + cacheTime) {
		cachedValue.value = await fetchData();
		cachedDate.value = date;
	}

	return cachedValue.value;
}
