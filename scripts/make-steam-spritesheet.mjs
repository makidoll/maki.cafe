import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import { makeSpriteSheet } from "./make-spritesheet-lib.mjs";

const __dirname = path.dirname(
	import.meta.url.replace(
		"file://" + (os.platform() == "win32" ? "/" : ""),
		"",
	),
);

const fetch = fetchCookie(nodeFetch);

// https://www.steamgriddb.com/
// steamgriddb uses 920x430
// steam uses 460x215 which is 0.5
const scale = 0.5;
const bannerWidth = 920 * scale;
const bannerHeight = 430 * scale;

const sheetWidth = 5;
const sheetHeight = 5;

const steamIds = [
	"972660", // spiritfarer
	"210970", // the witness
	"524220", // nier automata
	"1113560", // nier replicant
	"504230", // celeste
	"447040", // watch dogs 2
	"438100", // vrchat
	"224760", // fez
	"253230", // a hat in time
	"257850", // hyper light drifer
	"620", // portal 2
	"219890", // anti chamber
	"413150", // stardew valley
	"394690", // tower unite
	"963000", // frog detective 1
	"650700", // yume nikki
];

const imagePaths = [
	// from https://www.steamgriddb.com
	"assets/games/earthbound.png",
	"assets/games/catherine-full-body.png",
	"assets/games/super-mario-odyssey.png",
	"assets/games/mother-3.png",
	"assets/games/drakengard-3.png",
];

(async () => {
	const bannerInputs = await Promise.all(
		[...steamIds, ...imagePaths].map(async (steamIdOrPath, i) => {
			let buffer;
			if (/^[0-9]/.test(steamIdOrPath)) {
				const res = await fetch(
					"https://cdn.cloudflare.steamstatic.com/steam/apps/" +
						steamIdOrPath +
						"/header.jpg",
				);
				buffer = await res.buffer();
			} else {
				buffer = fs.readFileSync(path.resolve(steamIdOrPath));
			}
			return buffer;
		}),
	);

	await makeSpriteSheet(
		bannerWidth,
		bannerHeight,
		sheetWidth,
		sheetHeight,
		bannerInputs,
		path.resolve(__dirname, "../src/assets/steam-spritesheet.jpg"),
	);

	fs.writeFileSync(
		path.resolve(__dirname, "../src/app/cards/games/steam-ids.ts"),
		"export const steamIds = " + JSON.stringify(steamIds),
	);
})();
