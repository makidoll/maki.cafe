import axiosNoCookiejar from "axios";
import * as axiosCookiejar from "axios-cookiejar-support";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { CookieJar } from "tough-cookie";
import { makeSpriteSheet } from "./make-spritesheet-lib.mjs";

const __dirname = path.dirname(
	import.meta.url.replace(
		"file://" + (os.platform() == "win32" ? "/" : ""),
		"",
	),
);

const jar = new CookieJar();
const axios = axiosCookiejar.wrapper(axiosNoCookiejar.create({ jar }));

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

// TODO: move this into ../config.ts

const steamIds = [
	"210970", // the witness
	"224760", // fez
	"504230", // celeste
	"782330", // doom eternal
	"524220", // nier automata
	"1055540", // a short hike
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
	"1332010", // stray
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
				const res = await axios(
					"https://cdn.cloudflare.steamstatic.com/steam/apps/" +
						steamIdOrPath +
						// "/header.jpg",
						"/capsule_184x69.jpg",
					{ responseType: "arraybuffer" },
				);
				buffer = res.data;
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
