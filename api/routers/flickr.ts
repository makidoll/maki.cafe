import axios from "axios";
import { config } from "../../utils/config";
import { baseProcedure, router } from "../trpc";
import { RouterCache } from "../router-cache";

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

const cache = new RouterCache<Post[]>("flickr");

async function fetchFlickr() {
	const res = await axios(
		"https://www.flickr.com/services/feeds/photos_public.gne?id=" +
			config.socialIds.flickr +
			"&format=json&lang=en-us",
	);

	const json = res.data.replace(/^jsonFlickrFeed\(/, "").replace(/\)$/, "");

	const data: { items: Post[] } = JSON.parse(json);

	return data.items.slice(0, 20);
}

export const flickrRouter = router({
	all: baseProcedure
		// .input(
		// 	z.object({
		// 		name: z.string().nullish(),
		// 	}),
		// )
		.query(async ({ input }): Promise<Post[]> => {
			return await cache.get(fetchFlickr);
		}),
});
