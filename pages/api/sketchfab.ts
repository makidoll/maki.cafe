import type { NextApiRequest, NextApiResponse } from "next";
import { apiCache } from "../../utils/api/api-cache";
import { getBrowser } from "../../utils/api/playwright-browser";
import { config } from "../../utils/config";

interface Model {
	url: string;
	src: string;
	alt: string;
}

export type SketchfabReponse = Model[];

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
		res.status(200).json(await apiCache("sketchfab", fetchSketchfabPosts));
	} catch (error) {
		res.status(500).json({ error: "something happened sorry" } as any);
		console.error(error);
	}
}
