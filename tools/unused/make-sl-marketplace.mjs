import axiosNoCookiejar from "axios";
import * as axiosCookiejar from "axios-cookiejar-support";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { firefox } from "playwright";
import { CookieJar } from "tough-cookie";
import { makeSpriteSheet } from "../spritesheet-lib.mjs";

const __dirname = path.dirname(
	import.meta.url.replace(
		"file://" + (os.platform() == "win32" ? "/" : ""),
		"",
	),
);

const jar = new CookieJar();
const axios = axiosCookiejar.wrapper(axiosNoCookiejar.create({ jar }));

const storeUrl = "https://marketplace.secondlife.com/en-US/stores/65674";

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

const bannerWidth = 700;
const bannerHeight = 525;
const bannerPadding = 16;

const sheetWidth = 2;
const sheetHeight = 2;

(async () => {
	const browser = await firefox.launch({
		headless: true,
		firefoxUserPrefs: {
			// "network.trr.uri": "https://adblock.doh.mullvad.net/dns-query",
			"network.trr.uri": "https://1.1.1.1/dns-query",
			"network.trr.mode": 3, // only use doh
		},
	});

	const page = await browser.newPage();
	await page.goto(storeUrl + "?" + args.join("&"), {
		waitUntil: "domcontentloaded",
	});

	const found = [];

	for (const item of await page.$$(".gallery-item")) {
		const img = await item.$("img");
		const a = await item.$("a");

		found.push({
			imageUrl: await img.getAttribute("src"),
			url:
				"https://marketplace.secondlife.com" +
				(await a.getAttribute("href")),
		});
	}

	await page.close();
	await browser.close();

	console.log(`Found ${found.length} items`);
	console.log(`Downloading...`);

	const buffersAndUrls = await Promise.all(
		found.map(async item => {
			const res = await axios(item.imageUrl, {
				responseType: "arraybuffer",
			});

			return {
				buffer: res.data,
				url: item.url,
			};
		}),
	);

	const spriteSheetOut = await makeSpriteSheet(
		bannerWidth,
		bannerHeight,
		bannerPadding,
		sheetWidth,
		sheetHeight,
		buffersAndUrls.map(o => o.buffer),
		path.resolve(
			__dirname,
			"../../components/home-cards/sl-spritesheet.png",
		),
	);

	fs.writeFileSync(
		path.resolve(__dirname, "../../components/home-cards/sl-info.ts"),
		"export const slMarketplaceInfo = " +
			JSON.stringify({
				cssSize: spriteSheetOut.cssSize,
				items: buffersAndUrls.map((o, i) => ({
					url: o.url,
					position: spriteSheetOut.cssPositions[i],
				})),
			}),
	);
})();
