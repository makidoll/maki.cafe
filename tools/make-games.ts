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
const sheetHeight = 10;

// banners from https://www.steamgriddb.com

// TODO: add beginners guide

const games: (string | { banner: string; url: string })[] = [
	{
		banner: "games/metroid.png",
		url: "https://metroid.nintendo.com/",
	},
	{
		banner: "games/the-witness.jpg",
		url: "https://store.steampowered.com/app/210970/The_Witness/",
	},
	// "210970",
	{
		banner: "games/fez.jpg",
		url: "https://store.steampowered.com/app/224760/FEZ/",
	},
	// -- new line
	{
		banner: "games/portal2.png",
		url: "https://store.steampowered.com/app/620/Portal_2/",
	},
	"504230", // celeste
	"553420", // -- tunic
	// -- now smaller, new line
	"524220", // nier automata
	"220", // half life 2
	"813230", // animal well
	"257850", // hyper light drifer
	// -- new line
	"1113560", // nier replicant
	"782330", // doom eternal
	"570940", // dark souls
	"367520", // hollow knight
	// -- new line
	"219890", // anti chamber
	"499180", // braid anniversary edition
	"375820", // human resource machine
	"1003590", // tetris effect
	// -- new line
	"17410", // mirrors edge
	"1332010", // stray
	"1709170", // paradise marsh
	"1055540", // a short hike
	// -- new line
	"972660", // spiritfarer
	"413150", // stardew valley
	"427520", // factorio
	"650700", // yume nikki
	// -- new line
	"447040", // watch dogs 2
	"253230", // a hat in time
	"963000", // frog detective 1
	"319630", // life is strange
	// -- new line
	{
		banner: "games/overwatch.png",
		url: "https://store.steampowered.com/app/2357570/Overwatch_2/",
	},
	"976730", // halo mcc
	"1895880", // ratchet and clank rift apart
	"420530", // one shot
	// -- new line
	"303210", // the beginners guide
	"394690", // tower unite
	"438100", // vrchat
	{
		banner: "games/universal-paperclips.png",
		url: "https://www.decisionproblem.com/paperclips/",
	},
	// -- new line
	{
		banner: "games/earthbound.png",
		url: "https://www.youtube.com/watch?v=KXQqhRETBeE",
	},
	{
		banner: "games/mother-3.png",
		url: "http://mother3.fobby.net/",
	},
	{
		banner: "games/super-mario-odyssey.png",
		url: "https://www.nintendo.com/store/products/super-mario-odyssey-switch/",
	},
	{
		banner: "games/splatoon-2.png",
		url: "https://splatoon.nintendo.com",
	},
	// -- new line
	{
		banner: "games/catherine-full-body.png",
		url: "https://www.catherinethegame.com/fullbody/",
	},
	{
		banner: "games/world-of-warcraft.png",
		url: "https://worldofwarcraft.blizzard.com/en-us/",
	},
	{
		banner: "games/tropix-2.png",
		url: "https://www.tropixgame.com/",
	},
	{
		banner: "games/animal-crossing-cropped.png",
		url: "https://animalcrossing.nintendo.com/",
	},
	// -- new line
	{
		banner: "games/picross-3d-round-2.jpg",
		url: "https://www.nintendo.com/store/products/picross-3d-round-2-3ds/",
	},
	{
		banner: "games/kirby-and-the-forgotten-land.png",
		url: "https://kirbyandtheforgottenland.nintendo.com/",
	},
	{
		banner: "games/minecraft.png",
		url: "https://www.betterthanadventure.net",
	},
	{
		banner: "games/vintage-story.png",
		url: "https://www.vintagestory.at/",
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
		path.resolve(__dirname, "../components/assets/games-spritesheet.png"),
	);

	await fs.writeFile(
		path.resolve(__dirname, "../components/assets/games-info.ts"),
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
