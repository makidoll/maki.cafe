import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { DataSource } from "./data-source";
import { GitHubData, GitHubDataResponse } from "./sources/github";
import { MastodonData, MastodonDataResponse } from "./sources/mastodon";
import { SketchfabData, SketchfabDataResponse } from "./sources/sketchfab";
import {
	SlMarketplaceData,
	SlMarketplaceDataResponse,
} from "./sources/sl-marketplace";
import { UptimeData, UptimeDataResponse } from "./sources/uptime";

export interface LatestData {
	// flickr: FlickrDataResponse;
	github: GitHubDataResponse;
	mastodon: MastodonDataResponse;
	sketchfab: SketchfabDataResponse;
	slMarketplace: SlMarketplaceDataResponse;
	uptime: UptimeDataResponse;
}

class DataSources {
	dataSources: { [key: string]: DataSource<any> } = {
		// flickr: new FlickrData("flickr"),
		github: new GitHubData("github"),
		mastodon: new MastodonData("mastodon"),
		sketchfab: new SketchfabData("sketchfab"),
		slMarketplace: new SlMarketplaceData("sl-marketplace"),
		uptime: new UptimeData("uptime"),
	};

	constructor() {
		for (const dataSource of Object.values(this.dataSources)) {
			dataSource.init();
		}
	}

	getLatest() {
		let latest: { [key: string]: any } = {};

		for (const [key, dataSource] of Object.entries(this.dataSources)) {
			latest[key] = dataSource.getLatest();
		}

		return latest as LatestData;
	}
}

// const dataSources = new GlobalRef<DataSources>(
// 	"data.sources",
// 	new DataSources(),
// );

// export function getLatestData() {
// 	return dataSources.value.getLatest();
// }

if (process.env.MAKI_SERVER != undefined) {
	console.log("Running data sources server outside of Next.js");

	process.env.APP_ROOT = resolve(
		dirname(fileURLToPath(import.meta.url)),
		"..",
	);

	new DataSources();
}
