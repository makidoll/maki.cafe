import axios from "axios";
import { DataSource } from "../data-source";
import { config } from "../../utils/config";

interface FlickrPost {
	title: string;
	link: string;
	media: { m: string };
	date_taken: string;
	description: string;
	published: string;
	author: string;
	author_id: string;
	tags: string;
}

export type FlickrDataResponse = FlickrPost[];

export class FlickrData extends DataSource<FlickrDataResponse> {
	async fetchData() {
		const res = await axios(
			"https://www.flickr.com/services/feeds/photos_public.gne?id=" +
				config.socialIds.flickr +
				"&format=json&lang=en-us",
		);

		const json = res.data
			.replace(/^jsonFlickrFeed\(/, "")
			.replace(/\)$/, "");

		const data: { items: FlickrPost[] } = JSON.parse(json);

		return data.items.slice(0, 20);
	}
}
