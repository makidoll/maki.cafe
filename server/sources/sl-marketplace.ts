import { getBrowser } from "../../utils/api/playwright-browser";
import { config } from "../../utils/config";
import { sleep } from "../../utils/utils";
import { DataSource } from "../data-source";

interface SlItem {
	url: string;
	imageUrl: string;
}

const args = [
	"utf8=✓",
	"search[layout]=gallery",
	// "search[category_id]=",
	"search[sort]=released_at_desc",
	"search[per_page]=96",
	// "search[keywords]=",
	// "search[price_low]=",
	// "search[price_high]=",
	// "search[land_impact_low]=",
	// "search[land_impact_high]=",
	// "search[copy_permission]=0",
	// "search[modify_permission]=0",
	// "search[transfer_permission]=0",
	// "search[no_limited_quantities]=0",
	// "search[no_demos]=0",
];

export type SlMarketplaceDataResponse = SlItem[];

export class SlMarketplaceData extends DataSource<SlMarketplaceDataResponse> {
	protected intervalMinutes = 60 * 12; // every 12 hours

	async fetchData() {
		const browser = await getBrowser();
		const page = await browser.newPage();

		await page.goto(
			config.socialLinks.secondLife.marketplace + "?" + args.join("&"),
			{
				waitUntil: "networkidle",
			},
		);

		// idk if this is gonna help
		// await sleep(1000 * 5);
		// TODO: idk why this fails

		const itemEls = await page.$$(".gallery-item");

		const items: SlItem[] = [];

		for (const item of itemEls) {
			const img = await item.$("img");
			if (img == null) continue;

			const a = await item.$("a");
			if (a == null) continue;

			const src = await img.getAttribute("src");
			const href = await a.getAttribute("href");

			items.push({
				url: "https://marketplace.secondlife.com" + (href ?? ""),
				imageUrl: src ?? "",
			});
		}

		page.close();

		if (items.length == 0) {
			throw new Error("SL marketplace returned nothing again");
		}

		return items.slice(0, 9);
	}
}
