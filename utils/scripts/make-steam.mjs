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
const sheetHeight = 8;

// TODO: move this into ../config.ts

const steamIds = [
	"210970", // the witness
	"224760", // fez
	"2357570", // overwatch
	// -- new line
	"620", // portal 2
	"504230", // celeste
	"524220", // nier automata
	// -- now smaller, new line
	"1055540", // a short hike
	"257850", // hyper light drifer
	"219890", // anti chamber
	"972660", // spiritfarer
	// -- new line
	"438100", // vrchat
	"782330", // doom eternal
	"1003590", // tetris effect
	"1113560", // nier replicant
	// -- new line
	"394690", // tower unite
	"413150", // stardew valley
	"963000", // frog detective 1
	"650700", // yume nikki
	// -- new line
	"1332010", // stray
	"447040", // watch dogs 2
	"570940", // dark souls
	"553420", // tunic
	// -- new line
	"275850", // no mans sky
	"976730", // halo mcc
	"367520", // hollow knight
	"427520", // factorio
	// -- new line
	"1895880", // ratchet and clank rift apart
	"319630", // life is strange
];

const imagePathsAndUrls = [
	// from https://www.steamgriddb.com
	{
		path: "../games/earthbound.png",
		url: "https://www.youtube.com/watch?v=KXQqhRETBeE",
	},
	{
		path: "../games/picross-3d-round-2.jpg",
		url: "https://www.nintendo.com/store/products/picross-3d-round-2-3ds/",
	},
	{
		path: "../games/mother-3.png",
		url: "http://mother3.fobby.net/",
	},
	{
		path: "../games/super-mario-odyssey.png",
		url: "https://www.nintendo.com/store/products/super-mario-odyssey-switch/",
	},
	{
		path: "../games/splatoon-2.png",
		url: "https://splatoon.nintendo.com",
	},
	{
		path: "../games/universal-paperclips.png",
		url: "https://www.decisionproblem.com/paperclips/",
	},
	{
		path: "../games/catherine-full-body.png",
		url: "https://www.catherinethegame.com/fullbody/",
	},
	{
		path: "../games/world-of-warcraft.png",
		url: "https://worldofwarcraft.blizzard.com/en-us/",
	},
	{
		path: "../games/tropix-2.png",
		url: "https://www.tropixgame.com/",
	},
].map(e => ({ ...e, path: path.resolve(__dirname, e.path) }));

(async () => {
	const bannerInputs = await Promise.all(
		[...steamIds, ...imagePathsAndUrls.map(e => e.path)].map(
			async (steamIdOrPath, i) => {
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
			},
		),
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
				nonSteamLinks: imagePathsAndUrls.map(e => e.url),
			}),
	);
})();
