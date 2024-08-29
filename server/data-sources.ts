import { DataSource } from "./data-source";
import { AurData, AurDataResponse } from "./sources/aur";
import { MastodonData, MastodonDataResponse } from "./sources/mastodon";
import { SketchfabData, SketchfabDataResponse } from "./sources/sketchfab";
import {
	SlMarketplaceData,
	SlMarketplaceDataResponse,
} from "./sources/sl-marketplace";
import { UptimeData, UptimeDataResponse } from "./sources/uptime";

export interface LatestData {
	aur: AurDataResponse;
	// flickr: FlickrDataResponse;
	// github: GitHubDataResponse;
	mastodon: MastodonDataResponse;
	sketchfab: SketchfabDataResponse;
	slMarketplace: SlMarketplaceDataResponse;
	uptime: UptimeDataResponse;
}

export class DataSources {
	dataSources: { [key: string]: DataSource<any> } = {
		aur: new AurData("aur"),
		// flickr: new FlickrData("flickr"),
		// github: new GitHubData("github"),
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
