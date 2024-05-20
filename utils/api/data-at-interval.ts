export class DataAtInterval<T> {
	private latest: T | null = null;

	private interval: NodeJS.Timeout;

	constructor(
		private readonly fetchData: () => Promise<T>,
		intervalMinutes = 60,
	) {
		this.interval = setInterval(
			this.tryFetchData,
			1000 * 60 * intervalMinutes,
		);

		this.tryFetchData();
	}

	private async tryFetchData() {
		console.log("fetching data");
		try {
			const data = await this.fetchData();
			if (data == null) throw new Error("Fetched data is null");
			this.latest = data;
		} catch (error) {
			console.error(error);
		}
	}

	cleanup() {
		clearInterval(this.interval);
	}

	getLatest(): T | null {
		// next.js doesnt know how to serialize undefined
		return JSON.parse(JSON.stringify(this.latest));
	}
}
