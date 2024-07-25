import * as fs from "fs";
import * as os from "os";
import * as path from "path";
// import nodeFetch from "node-fetch";
// import fetchCookie from "fetch-cookie";
// import cheerio from "cheerio";
import { firefox } from "playwright";
import { makeSpriteSheet } from "../spritesheet-lib.mjs";

// const cookieJar = new fetchCookie.toughCookie.CookieJar();
// const fetch = fetchCookie(nodeFetch, cookieJar);

// use a vpn to montreal or quebec maybe??

// this is my attempt to pull data from the slowest site ever lol

const __dirname = path.dirname(
	import.meta.url.replace(
		"file://" + (os.platform() == "win32" ? "/" : ""),
		"",
	),
);

const username = "MakiXx_";
const mfcUrl = "https://myfigurecollection.net";

const sheetWidth = 6;
const sheetHeight = 4;

// mfc resolution
const imageWidth = 60;
const imageHeight = 60;
const imagePadding = 2;

// const fetchOptions = {
// 	headers: {
// 		"User-Agent":
// 			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4655.6 Safari/537.36",
// 	},
// };

const timeout = 1000 * 60 * 2; // 2 minutes maybe?  mfc is so slow

(async () => {
	const browser = await firefox.launch({
		headless: false,
		firefoxUserPrefs: {
			"network.trr.uri": "https://adblock.doh.mullvad.net/dns-query",
			"network.trr.mode": 3, // only use doh
		},
	});

	// const addFromUrl = async (url, type) => {
	// 	const data = [];

	// 	const res = await fetch(url, fetchOptions);
	// 	const html = await res.text();
	// 	const $ = cheerio.load(html);

	// 	$("span.item-icon a").each((i, a) => {
	// 		const link = mfcUrl + a.attribs.href;

	// 		const img = $("img", a);
	// 		const imageUrl = img[0].attribs.src;
	// 		const name = img[0].attribs.alt;

	// 		data.push({
	// 			name,
	// 			link,
	// 			imageUrl,
	// 			type,
	// 		});
	// 	});

	// 	console.log("> " + type);
	// 	return data;
	// };

	const addFromUrl = async (url, type) => {
		const data = [];

		const page = await browser.newPage();

		// save image buffers as they load
		const imageBuffers = {};
		page.on("response", async response => {
			const responseUrl = response.url();
			if (
				!(
					responseUrl.includes(".jpg") &&
					responseUrl.includes("/upload/items/")
				)
			) {
				return;
			}
			imageBuffers[responseUrl] = await response.body();
		});

		await page.goto(url, {
			waitUntil: "load",
			timeout,
		});

		const aTags = await page.$$("span.item-icon a");

		for (const a of aTags) {
			const url = await page.evaluate(e => e.href, a);

			const img = await a.$("img");
			const src = await page.evaluate(e => e.src, img);
			const name = await page.evaluate(e => e.alt, img);

			const imageBuffer = imageBuffers[src];

			data.push({
				name,
				url,
				imageBuffer,
				type,
			});
		}

		page.close();

		console.log("> " + type);
		return data;
	};

	// rootId means figures only, not goods
	const baseUrl =
		mfcUrl +
		"/users.v4.php?mode=view&username=" +
		username +
		"&tab=collection&page=1&rootId=0";

	console.log("Opening and closing site...");

	// open mfc first and then open the rest
	const page = await browser.newPage();
	await page.goto(mfcUrl, {
		// dont fully load it
		waitUntil: "domcontentloaded",
		timeout,
	});
	page.close();

	console.log("Downloading figures...");

	let mfcData = (
		await Promise.all([
			addFromUrl(baseUrl + "&status=2", "owned"),
			addFromUrl(baseUrl + "&status=1", "ordered"),
			addFromUrl(baseUrl + "&status=0", "wished"),
		])
	).flat();

	// turn image urls into buffers for spritesheet

	// console.log("Downloading images...");

	// const imageInputs = await Promise.all(
	// 	mfcData.map(async figure => {
	// 		const res = await fetch(figure.imageUrl, fetchOptions);
	// 		console.log("> " + figure.name);
	// 		return await res.buffer();
	// 	}),
	// );

	console.log("Making spiritesheet...");

	const spriteSheetOut = await makeSpriteSheet(
		imageWidth,
		imageHeight,
		imagePadding,
		sheetWidth,
		sheetHeight,
		mfcData.map(figure => figure.imageBuffer),
		path.resolve(__dirname, "../../components/assets/mfc-spritesheet.jpg"),
	);

	// merge css positions with mfcData
	for (let i = 0; i < mfcData.length; i++) {
		delete mfcData[i].imageBuffer;
		mfcData[i].position = spriteSheetOut.cssPositions[i];
	}

	fs.writeFileSync(
		path.resolve(__dirname, "../../components/assets/mfc-info.ts"),
		"export const mfcData = " +
			JSON.stringify({
				cssSize: spriteSheetOut.cssSize,
				figures: mfcData,
			}),
	);

	console.log("Done");

	await browser.close();
})();
