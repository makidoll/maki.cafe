import { DataAtInterval } from "../utils/api/data-at-interval";
import { getBrowser } from "../utils/api/playwright-browser";
import { config } from "../utils/config";
import { GlobalRef } from "../utils/global-ref";

interface SlItem {
	url: string;
	imageUrl: string;
}

const args = [
	"utf8=✓",
	"search[layout]=gallery",
	"search[category_id]=",
	"search[sort]=released_at_desc",
	"search[per_page]=96",
	"search[keywords]=",
	"search[price_low]=",
	"search[price_high]=",
	"search[land_impact_low]=",
	"search[land_impact_high]=",
	"search[copy_permission]=0",
	"search[modify_permission]=0",
	"search[transfer_permission]=0",
	"search[limited_quantities]=0",
	"search[is_demo]=0",
];

export const slMarketplaceData = new GlobalRef(
	"data.slMarketplace",
	new DataAtInterval(async () => {
		const browser = await getBrowser();
		const page = await browser.newPage();

		await page.goto(
			config.socialLinks.slMarketplace + "?" + args.join("&"),
			{
				waitUntil: "networkidle",
			},
		);

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

		return items.slice(0, 9);
	}),
);

export type SlMarketplaceData = ReturnType<
	typeof slMarketplaceData.value.getLatest
>;
