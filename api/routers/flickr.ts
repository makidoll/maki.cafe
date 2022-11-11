import axios from "axios";
import { config } from "../../utils/config";
import { baseProcedure, router } from "../trpc";
import { flickrMockData } from "./flickr-mock-data";

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

let cachedPosts: Post[];
let cachedDate: number;

const cacheTime = 5 * 60 * 1000; // 5 minutes in milliseconds

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
			if (process.env.NODE_ENV == "development") {
				return flickrMockData;
			}

			const date = Date.now();

			if (cachedPosts == null || date > cachedDate + cacheTime) {
				cachedPosts = await fetchFlickr();
				cachedDate = date;
			}

			return cachedPosts;
		}),
});
