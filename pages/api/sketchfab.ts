import type { NextApiRequest, NextApiResponse } from "next";
import { getBrowser } from "../../utils/api/playwright-browser";
import { RouterCache } from "../../utils/api/router-cache";
import { config } from "../../utils/config";

interface Model {
	url: string;
	src: string;
	alt: string;
}

export type SketchfabReponse = Model[];

const cache = new RouterCache<SketchfabReponse>("sketchfab");

// (async () => {
// 	console.log("hiya");

// 	console.log(browser);
// })();

async function fetchSketchfabPosts(): Promise<SketchfabReponse> {
	const browser = await getBrowser();
	const page = await browser.newPage();

	// without /models, shows most popular
	await page.goto(config.socialLinks.sketchfab + "/models", {
		waitUntil: "networkidle",
	});

	const modelEls = await page.$$('div[itemtype="http://schema.org/3DModel"]');

	const models: SketchfabReponse = [];

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

	page.close();

	return models.slice(0, 16);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SketchfabReponse>,
) {
	try {
		const data = await cache.get(fetchSketchfabPosts);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: "something happened sorry" } as any);
		console.error(error);
	}
}
