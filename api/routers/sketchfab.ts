import { config } from "../../utils/config";
import { getBrowser } from "../playwright-browser";
import { RouterCache } from "../router-cache";
import { baseProcedure, router } from "../trpc";

interface Model {
	url: string;
	src: string;
	alt: string;
}

const cache = new RouterCache<Model[]>("sketchfab");

// (async () => {
// 	console.log("hiya");

// 	console.log(browser);
// })();

async function fetchSketchfabPosts(): Promise<Model[]> {
	const browser = await getBrowser();
	const page = await browser.newPage();

	// without /models, shows most popular
	await page.goto(config.socialLinks.sketchfab + "/models", {
		waitUntil: "networkidle",
	});

	const modelEls = await page.$$('div[itemtype="http://schema.org/3DModel"]');

	const models: Model[] = [];

	for (const modelEl of modelEls) {
		const metaUrlEl = await modelEl.$('meta[itemprop="url"]');
		if (metaUrlEl == null) {
			console.error("Failed to get url for current model");
			continue;
		}

		const url = (await metaUrlEl.getAttribute("content")) ?? "";

		const imgEl = await modelEl.$("img");
		if (imgEl == null) {
			console.error("Failed to get img for current model");
			continue;
		}

		const src = (await imgEl.getAttribute("src")) ?? "";
		const alt = (await imgEl.getAttribute("alt")) ?? "";

		models.push({ url, src, alt });
	}

	return models.slice(0, 16);
}

export const sketchfabRouter = router({
	all: baseProcedure.query(async ({ input }): Promise<Model[]> => {
		return await cache.get(fetchSketchfabPosts);
	}),
});
