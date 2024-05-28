import axios from "axios";
import { JSDOM } from "jsdom";
import { DataSource } from "../data-source";

export type UptimeService = {
	name: string;
	url: string;
	up: boolean;
	uptimeWeek: number;
};

export type UptimeDataResponse = UptimeService[];

export class UptimeData extends DataSource<UptimeDataResponse> {
	protected intervalMinutes = 5;

	async fetchData() {
		const res = await axios(
			"https://uptime.hotmilk.space/api/v1/endpoints/statuses?page=1",
		);

		const response: UptimeDataResponse = [];

		for (const result of res.data) {
			const badgeUptimeWeekRes = await axios(
				"https://uptime.hotmilk.space/api/v1/endpoints/" +
					result.key +
					"/uptimes/7d/badge.svg",
			);

			const dom = new JSDOM(badgeUptimeWeekRes.data);

			const percentage = Array.from(
				dom.window.document.querySelectorAll("text").values(),
			)
				.map(e => e.textContent.trim())
				.find(v => v.endsWith("%"));

			const lastResult =
				result.results.length == 0 ? null : result.results.pop();

			const hostname = lastResult?.hostname;

			let url = null;
			if (hostname != null) {
				switch (result.name.toLowerCase()) {
					case "mumble":
						url = "mumble://" + hostname;
						break;
					default:
						url = "https://" + hostname;
						break;
				}
			}

			const service: UptimeService = {
				name: result.name,
				url,
				up: lastResult?.success,
				uptimeWeek: Number(percentage.replace(/%$/, "")),
			};

			response.push(service);
		}

		return response;
	}
}
