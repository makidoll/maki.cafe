import { GlobalRef } from "../utils/global-ref";

export class RouterCache<T> {
	cacheTime = 0;

	cachedValue: GlobalRef<T>;
	cachedDate: GlobalRef<number>;

	constructor(keyName: string, cacheTime = 5 * 60 * 1000) {
		this.cacheTime = cacheTime;
		this.cachedValue = new GlobalRef<T>(keyName + ".cached.value");
		this.cachedDate = new GlobalRef<number>(keyName + ".cached.date");
		this.cachedDate.value = 0;
	}

	async get(fetchData: () => Promise<T>) {
		const date = Date.now();

		if (
			this.cachedValue.value == null ||
			date > this.cachedDate.value + this.cacheTime
		) {
			this.cachedValue.value = await fetchData();
			this.cachedDate.value = date;
		}

		return this.cachedValue.value;
	}
}
