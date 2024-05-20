import axios from "axios";
import { config } from "../utils/config";
import { DataAtInterval } from "../utils/api/data-at-interval";
import { GlobalRef } from "../utils/global-ref";

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

export const flickrData = new GlobalRef(
	"data.flickr",
	new DataAtInterval(async () => {
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
	}),
);

export type FlickrData = ReturnType<typeof flickrData.value.getLatest>;
