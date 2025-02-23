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
const sheetHeight = 12;

// banners from https://www.steamgriddb.com

const games: Record<string, (string | { banner: string; url: string })[]> = {
	metroidbrania: [
		{
			banner: "games/the-witness.jpg",
			url: "https://store.steampowered.com/app/210970/The_Witness/",
		},
		"553420", // tunic
		{
			banner: "games/fez.jpg",
			url: "https://store.steampowered.com/app/224760/FEZ/",
		},
		"813230", // animal well
	],
	souls: [
		"1627720", // lies of p
		"570940", // dark souls
		"257850", // hyper light drifer
		"367520", // hollow knight
	],
	puzzle: [
		{
			banner: "games/metroid.png",
			url: "https://metroid.nintendo.com/",
		},
		{
			banner: "games/portal2.png",
			url: "https://store.steampowered.com/app/620/Portal_2/",
		},
		"219890", // anti chamber
		"375820", // human resource machine
		"1003590", // tetris effect
		"427520", // factorio
		"499180", // braid anniversary edition
		{
			banner: "games/picross-3d-round-2.jpg",
			url: "https://www.youtube.com/watch?v=jA-et0LCpNo",
		},
	],
	fps: [
		"220", // half life 2
		"782330", // doom eternal
		"976730", // halo mcc
	],
	platformer: [
		"504230", // celeste
		"17410", // mirrors edge
		{
			banner: "games/super-mario-odyssey.png",
			url: "https://www.nintendo.com/store/products/super-mario-odyssey-switch/",
		},
		{
			banner: "games/kirby-and-the-forgotten-land.png",
			url: "https://kirbyandtheforgottenland.nintendo.com/",
		},
	],
	story: [
		"972660", // spiritfarer
		"1709170", // paradise marsh
		"1055540", // a short hike
		"1332010", // stray
		// -- new line
		"524220", // nier automata
		"1113560", // nier replicant
		{
			banner: "games/earthbound.png",
			url: "https://www.youtube.com/watch?v=KXQqhRETBeE",
		},
		{
			banner: "games/mother-3.png",
			url: "http://mother3.fobby.net/",
		},
		// -- new line
		"303210", // the beginners guide
		"963000", // frog detective 1
		"420530", // one shot
		"319630", // life is strange
		// -- new line
		"447040", // watch dogs 2
		"1895880", // ratchet and clank rift apart
		"253230", // a hat in time
		{
			banner: "games/catherine-full-body.png",
			url: "https://www.catherinethegame.com/fullbody/",
		},
		{
			banner: "games/splatoon-2.png",
			url: "https://splatoon.nintendo.com",
		},
	],
	multiplayer: [
		{
			banner: "games/overwatch.png",
			url: "https://store.steampowered.com/app/2357570/Overwatch_2/",
		},
		{
			banner: "games/vintage-story.png",
			url: "https://www.vintagestory.at/",
		},
		{
			banner: "games/fortnite-cropped.png",
			url: "https://www.fortnite.com",
		},
		"394690", // tower unite
		{
			banner: "games/world-of-warcraft.png",
			url: "https://worldofwarcraft.blizzard.com/en-us/",
		},
		{
			banner: "games/minecraft.png",
			url: "https://www.betterthanadventure.net",
		},
		"438100", // vrchat
	],
	chill: [
		"1868140", // dave the diver
		{
			banner: "games/tropix-2.png",
			url: "https://www.tropixgame.com/",
		},
		{
			banner: "games/animal-crossing-cropped.png",
			url: "https://animalcrossing.nintendo.com/",
		},
		"413150", // stardew valley
		"650700", // yume nikki
		{
			banner: "games/universal-paperclips.png",
			url: "https://www.decisionproblem.com/paperclips/",
		},
	],
};

interface GameInfo {
	buffer: Buffer;
	url: string;
	genre: string;
}

interface OutGameInfo {
	url: string;
	pos: string;
}

(async () => {
	let gamesInfo: GameInfo[] = [];

	for (const genre in games) {
		for (const game of games[genre]) {
			if (typeof game == "object") {
				gamesInfo.push({
					buffer: await fs.readFile(
						path.resolve(__dirname, game.banner),
					),
					url: game.url,
					genre,
				});
			} else {
				const res = await axios(
					"https://cdn.cloudflare.steamstatic.com/steam/apps/" +
						game +
						// "/header.jpg",
						"/capsule_184x69.jpg",
					{ responseType: "arraybuffer" },
				);

				gamesInfo.push({
					buffer: res.data,
					url: "https://store.steampowered.com/app/" + game,
					genre,
				});
			}
		}
	}

	const spriteSheetOut = await makeSpriteSheet(
		bannerWidth,
		bannerHeight,
		bannerPadding,
		sheetWidth,
		sheetHeight,
		gamesInfo.map(g => g.buffer),
		path.resolve(__dirname, "../components/assets/games-spritesheet.png"),
	);

	const outGamesInfo: Record<string, OutGameInfo[]> = {};

	let i = 0;

	for (const game of gamesInfo) {
		if (outGamesInfo[game.genre] == null) {
			outGamesInfo[game.genre] = [];
		}

		outGamesInfo[game.genre].push({
			url: game.url,
			pos: spriteSheetOut.cssPositions[i],
		});

		i++;
	}

	await fs.writeFile(
		path.resolve(__dirname, "../components/assets/games-info.ts"),
		"export const gamesInfo = " +
			JSON.stringify({
				size: spriteSheetOut.cssSize,
				games: outGamesInfo,
			}),
	);
})();
