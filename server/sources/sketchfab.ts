import { DataSource } from "../data-source";
import { getBrowser } from "../../utils/api/playwright-browser";
import { config } from "../../utils/config";
import { sleep } from "../../utils/utils";

interface SketchfabModel {
	url: string;
	src: string;
	alt: string;
}

export type SketchfabDataResponse = SketchfabModel[];

export class SketchfabData extends DataSource<SketchfabDataResponse> {
	async fetchData() {
		const browser = await getBrowser();
		const page = await browser.newPage();

		// without /models, shows most popular
		await page.goto(config.socialLinks.sketchfab + "/models", {
			waitUntil: "domcontentloaded",
		});

		await sleep(1000);

		const modelEls = await page.$$(
			'div[itemtype="http://schema.org/3DModel"]',
		);

		const models: SketchfabModel[] = [];

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
}
