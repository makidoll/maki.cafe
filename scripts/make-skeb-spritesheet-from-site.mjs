import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import fetch from "node-fetch";
import { makeSpriteSheet } from "./make-spritesheet-lib.mjs";

const __dirname = path.dirname(
	import.meta.url.replace(
		"file://" + (os.platform() == "win32" ? "/" : ""),
		"",
	),
);

const username = "Maki";

const scale = 2;
const skebWidth = 80 * scale;
const skebHeight = 96 * scale;

const sheetWidth = 4;
const sheetHeight = 3;

(async () => {
	// really cursed single liner lol, you're welcome
	const works = await Promise.all(
		eval(
			(
				await (await fetch("https://skeb.jp/@" + username)).text()
			).match(/<script>window\.__NUXT__=([^]+?);<\/script>/)[1],
		)
			.data[0].user.sent_works.slice(0, sheetWidth * sheetHeight)
			.map(async work => ({
				url: "https://skeb.jp" + work.path,
				buffer: await (
					await fetch(work.thumbnail_image_urls.src)
				).buffer(),
			})),
	);

	await makeSpriteSheet(
		skebWidth,
		skebHeight,
		sheetWidth,
		sheetHeight,
		works.map(work => work.buffer),
		path.resolve(__dirname, "../src/assets/skeb-spritesheet.jpg"),
	);

	fs.writeFileSync(
		path.resolve(__dirname, "../src/app/cards/skeb/skeb-urls.ts"),
		"export const skebUrls = " +
			JSON.stringify(works.map(work => work.url)),
	);
})();
