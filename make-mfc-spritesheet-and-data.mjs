import * as fs from "fs";
import * as path from "path";
// import nodeFetch from "node-fetch";
// import fetchCookie from "fetch-cookie";
// import cheerio from "cheerio";
import { makeSpriteSheet } from "./make-spritesheet-lib.mjs";
import puppeteer from "puppeteer";

// const cookieJar = new fetchCookie.toughCookie.CookieJar();
// const fetch = fetchCookie(nodeFetch, cookieJar);

// use a vpn to montreal or quebec maybe??

// this is my attempt to pull data from the slowest site ever lol

const username = "MakiXx_";
const mfcUrl = "https://myfigurecollection.net";

const sheetWidth = 6;
const sheetHeight = 4;

// mfc resolution
const imageWidth = 60;
const imageHeight = 60;

// const fetchOptions = {
// 	headers: {
// 		"User-Agent":
// 			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4655.6 Safari/537.36",
// 	},
// };

const timeout = 1000 * 60 * 2; // 2 minutes maybe?  mfc is so slow

(async () => {
	const browser = await puppeteer.launch({
		// headless: false
		headless: true,
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
		await page.setRequestInterception(true);

		page.on("request", request => {
			request.continue();
		});

		// save image buffers as they load
		const imageBuffers = {};
		page.on("response", async response => {
			const url = response.url();
			if (!(url.includes(".jpg") && url.includes("/pics/figure/"))) {
				return;
			}
			imageBuffers[url] = await response.buffer();
		});

		await page.goto(url, {
			waitUntil: "networkidle0",
			timeout,
		});

		const aTags = await page.$$("span.item-icon a");

		for (const a of aTags) {
			const link = await page.evaluate(e => e.href, a);

			const img = await a.$("img");
			const src = await page.evaluate(e => e.src, img);
			const name = await page.evaluate(e => e.alt, img);

			const imageBuffer = imageBuffers[src];

			data.push({
				name,
				link,
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

	browser.close();

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

	const positions = await makeSpriteSheet(
		imageWidth,
		imageHeight,
		sheetWidth,
		sheetHeight,
		mfcData.map(figure => figure.imageBuffer),
		path.resolve("src/assets/mfc-spritesheet.jpg"),
	);

	// merge css positions with mfcData
	for (let i = 0; i < mfcData.length; i++) {
		delete mfcData[i].imageBuffer;
		mfcData[i].position = positions[i];
	}

	fs.writeFileSync(
		path.resolve("src/app/cards/mfc/mfc.ts"),
		"export const mfcData = " + JSON.stringify(mfcData),
	);

	console.log("Done");
})();
