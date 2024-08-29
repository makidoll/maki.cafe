import { CronJob } from "cron";
import * as fs from "fs/promises";
import path from "path";

const cacheDir = path.resolve(__dirname, "../cache");

export class DataSource<T> {
	protected readonly intervalMinutes: number = 60; // once an hour
	protected async fetchData(): Promise<T | null> {
		return null;
	}

	private readonly cacheJsonPath: string;

	private latest: T | null = null;
	private cronJob: CronJob | null = null;

	constructor(cacheName: string) {
		this.cacheJsonPath = path.resolve(cacheDir, cacheName + ".json");
	}

	async loadFromCache(): Promise<{ stale: boolean }> {
		try {
			const cacheJson = await fs.readFile(this.cacheJsonPath, "utf8");
			const cache = JSON.parse(cacheJson);

			if (cache.data == null) throw new Error("Cache data is null");
			this.latest = cache.data;

			const cacheDate = Date.now() - new Date(cache.date).getTime();
			const cacheAge = cacheDate / 1000 / 60;

			return { stale: cacheAge > this.intervalMinutes };
		} catch (error) {
			return { stale: true };
		}
	}

	async saveToCache() {
		if (this.latest == null) return;
		try {
			await fs.writeFile(
				this.cacheJsonPath,
				JSON.stringify({
					date: new Date(),
					data: this.latest,
				}),
			);
		} catch (error) {}
	}

	async init() {
		if (this.cronJob != null) return;

		await fs.mkdir(cacheDir, { recursive: true });

		const { stale } = await this.loadFromCache();
		if (stale) {
			await this.tryFetchData();
		}

		if (this.intervalMinutes <= 0) return;

		this.cronJob = new CronJob(
			`*/${this.intervalMinutes} * * * *`,
			this.tryFetchData.bind(this),
			null,
			true,
		);
	}

	private async tryFetchData() {
		try {
			const data = await this.fetchData();
			if (data == null) throw new Error("Fetched data is null");

			this.latest = data;

			this.saveToCache();
		} catch (error) {
			console.error(error);
		}
	}

	cleanup() {
		if (this.cronJob == null) return;

		this.cronJob.stop();
		this.cronJob = null;
	}

	getLatest(): T | null {
		// next.js doesnt know how to serialize undefined
		return JSON.parse(JSON.stringify(this.latest));
	}
}
