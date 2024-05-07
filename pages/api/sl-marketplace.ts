import type { NextApiRequest, NextApiResponse } from "next";
import { apiCache } from "../../utils/api/api-cache";
import { getBrowser } from "../../utils/api/playwright-browser";
import { config } from "../../utils/config";

interface Item {
	url: string;
	imageUrl: string;
}

export type SlMarketplaceResponse = Item[];

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

async function fetchSlMarketplace(): Promise<SlMarketplaceResponse> {
	const browser = await getBrowser();
	const page = await browser.newPage();

	await page.goto(config.socialLinks.slMarketplace + "?" + args.join("&"), {
		waitUntil: "networkidle",
	});

	const itemEls = await page.$$(".gallery-item");

	const items: SlMarketplaceResponse = [];

	for (const item of itemEls) {
		const img = await item.$("img");
		if (img == null) continue;

		const a = await item.$("a");
		if (a == null) continue;

		items.push({
			url:
				"https://marketplace.secondlife.com" +
				((await a.getAttribute("href")) ?? ""),
			imageUrl: (await img.getAttribute("src")) ?? "",
		});
	}

	page.close();

	return items.slice(0, 9);
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SlMarketplaceResponse>,
) {
	try {
		res.status(200).json(
			await apiCache("sl-marketplace", fetchSlMarketplace),
		);
	} catch (error) {
		res.status(500).json({ error: "something happened sorry" } as any);
		console.error(error);
	}
}
