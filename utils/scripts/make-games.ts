import axios from "axios";
// import axiosNoCookiejar from "axios";
// import * as axiosCookiejar from "axios-cookiejar-support";
import * as fs from "fs/promises";
import * as os from "os";
import * as path from "path";
// import { CookieJar } from "tough-cookie";
import { makeSpriteSheet } from "./spritesheet-lib";

const __dirname = path.dirname(
	import.meta.url.replace(
		"file://" + (os.platform() == "win32" ? "/" : ""),
		"",
	),
);

// const jar = new CookieJar();
// const axios = axiosCookiejar.wrapper(axiosNoCookiejar.create({ jar }));

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
const bannerPadding = 4;

const sheetWidth = 5;
const sheetHeight = 9;

// banners from https://www.steamgriddb.com

const games: (string | { banner: string; url: string })[] = [
	{
		banner: "../games/metroid-dread.png",
		url: "https://metroid.nintendo.com/",
	},
	{
		banner: "../games/metroid-prime.png",
		url: "https://metroid.nintendo.com/",
	},
	"210970", // the witness
	// -- new line
	"224760", // fez
	"504230", // celeste
	"620", // portal 2
	// -- now smaller, new line
	"524220", // nier automata
	"782330", // doom eternal
	"17410", // mirrors edge
	"1113560", // nier replicant
	// -- new line
	"257850", // hyper light drifer
	"367520", // hollow knight
	"570940", // dark souls
	"553420", // tunic
	// -- new line
	"219890", // anti chamber
	"1055540", // a short hike
	"1332010", // stray
	"972660", // spiritfarer
	// -- new line
	"413150", // stardew valley
	"427520", // factorio
	"650700", // yume nikki
	"319630", // life is strange
	// -- new line
	"447040", // watch dogs 2
	"253230", // a hat in time
	"963000", // frog detective 1
	"220", // half life 2
	// -- new line
	"976730", // halo mcc
	"438100", // vrchat
	"394690", // tower unite
	"2357570", // overwatch
	// -- new line
	"1895880", // ratchet and clank rift apart
	"499180", // braid anniversary edition
	"1003590", // tetris effect
	{
		banner: "../games/picross-3d-round-2.jpg",
		url: "https://www.nintendo.com/store/products/picross-3d-round-2-3ds/",
	},
	// -- new line
	{
		banner: "../games/earthbound.png",
		url: "https://www.youtube.com/watch?v=KXQqhRETBeE",
	},
	{
		banner: "../games/mother-3.png",
		url: "http://mother3.fobby.net/",
	},
	{
		banner: "../games/super-mario-odyssey.png",
		url: "https://www.nintendo.com/store/products/super-mario-odyssey-switch/",
	},
	{
		banner: "../games/splatoon-2.png",
		url: "https://splatoon.nintendo.com",
	},
	// -- new line
	{
		banner: "../games/universal-paperclips.png",
		url: "https://www.decisionproblem.com/paperclips/",
	},
	{
		banner: "../games/catherine-full-body.png",
		url: "https://www.catherinethegame.com/fullbody/",
	},
	{
		banner: "../games/world-of-warcraft.png",
		url: "https://worldofwarcraft.blizzard.com/en-us/",
	},
	{
		banner: "../games/tropix-2.png",
		url: "https://www.tropixgame.com/",
	},
	// -- new line
	{
		banner: "../games/animal-crossing-cropped.png",
		url: "https://animalcrossing.nintendo.com/",
	},
];

(async () => {
	const buffersAndUrls = await Promise.all(
		games.map(async (steamIdOrObj, i) => {
			if (typeof steamIdOrObj == "object") {
				return {
					buffer: await fs.readFile(
						path.resolve(__dirname, steamIdOrObj.banner),
					),
					url: steamIdOrObj.url,
				};
			} else {
				const res = await axios(
					"https://cdn.cloudflare.steamstatic.com/steam/apps/" +
						steamIdOrObj +
						// "/header.jpg",
						"/capsule_184x69.jpg",
					{ responseType: "arraybuffer" },
				);

				return {
					buffer: res.data as Buffer,
					url: "https://store.steampowered.com/app/" + steamIdOrObj,
				};
			}
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
			"../../components/assets/games-spritesheet.png",
		),
	);

	await fs.writeFile(
		path.resolve(__dirname, "../../components/assets/games-info.ts"),
		"export const gamesInfo = " +
			JSON.stringify({
				cssSize: spriteSheetOut.cssSize,
				games: buffersAndUrls.map((o, i) => ({
					url: o.url,
					position: spriteSheetOut.cssPositions[i],
				})),
			}),
	);
})();