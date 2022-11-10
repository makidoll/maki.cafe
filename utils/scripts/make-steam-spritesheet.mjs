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
// steam uses 460x215 which is half the size

// const scale = 0.5;
// const bannerWidth = 920 * scale;
// const bannerHeight = 430 * scale;

// however steam capsule images are 231x87
// they look nicer so lets rescale and crop the steamgriddb images

const bannerWidth = 231;
const bannerHeight = 87;

const sheetWidth = 5;
const sheetHeight = 5;

const steamIds = [
	"210970", // the witness
	"224760", // fez
	"1055540", // a short hike
	"504230", // celeste
	"1332010", // stray
	"524220", // nier automata
	// -- gets smaller
	"620", // portal 2
	"438100", // vrchat
	"972660", // spiritfarer
	"257850", // hyper light drifer
	"219890", // anti chamber
	"1003590", // tetris effect
	"1113560", // nier replicant
	"413150", // stardew valley
	"447040", // watch dogs 2
	"394690", // tower unite
	"963000", // frog detective 1
	"650700", // yume nikki
];

const imagePaths = [
	// from https://www.steamgriddb.com
	"../games/overwatch-2.png",
	"../games/earthbound.png",
	"../games/catherine-full-body.png",
	"../games/super-mario-odyssey.png",
	"../games/mother-3.png",
	"../games/drakengard-3.png",
].map(p => path.resolve(__dirname, p));

(async () => {
	const bannerInputs = await Promise.all(
		[...steamIds, ...imagePaths].map(async (steamIdOrPath, i) => {
			let buffer;
			if (/^[0-9]/.test(steamIdOrPath)) {
				const res = await fetch(
					"https://cdn.cloudflare.steamstatic.com/steam/apps/" +
						steamIdOrPath +
						// "/header.jpg",
						"/capsule_184x69.jpg",
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
		path.resolve(
			__dirname,
			"../../components/home-cards/games-spritesheet.png",
		),
	);

	fs.writeFileSync(
		path.resolve(__dirname, "../../components/home-cards/games-info.ts"),
		"export const gamesInfo = " +
			JSON.stringify({
				sheetWidth,
				sheetHeight,
				steamIds,
				nonSteamGames: imagePaths.length,
			}),
	);
})();
