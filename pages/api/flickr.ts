import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../utils/config";
import { apiCache } from "../../utils/api/api-cache";

interface Post {
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

export type FlickrResponse = Post[];

async function fetchFlickr() {
	const res = await axios(
		"https://www.flickr.com/services/feeds/photos_public.gne?id=" +
			config.socialIds.flickr +
			"&format=json&lang=en-us",
	);

	const json = res.data.replace(/^jsonFlickrFeed\(/, "").replace(/\)$/, "");

	const data: { items: FlickrResponse } = JSON.parse(json);

	return data.items.slice(0, 20);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<FlickrResponse>,
) {
	try {
		res.status(200).json(await apiCache("flickr", fetchFlickr));
	} catch (error) {
		res.status(500).json({ error: "something happened sorry" } as any);
		console.error(error);
	}
}
