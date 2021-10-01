const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const fetch = require("isomorphic-fetch");

// steamgriddb uses 920x430
// steam uses 460x215 which is 0.5
const scale = 0.5;
const bannerWidth = 920 * scale;
const bannerHeight = 430 * scale;

const sheetWidth = 4;
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
	"620", // portal 2
	"257850", // hyper light drifer
	"219890", // anti chamber
	"413150", // stardew valley
	"394690", // tower unite
	"275850", // no mans sky
];

const imagePaths = [
	// from https://www.steamgriddb.com
	"assets/games/earthbound.png",
	"assets/games/catherine-full-body.png",
	"assets/games/super-mario-odyssey.png",
];

(async () => {
	const bannerBuffers = await Promise.all(
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
				buffer = fs.readFileSync(
					path.resolve(__dirname, steamIdOrPath),
				);
			}

			const x = i % sheetWidth;
			const y = Math.floor(i / sheetWidth);

			const input = await sharp(buffer)
				.resize(bannerWidth, bannerHeight, {
					fit: "cover",
					kernel: "lanczos3",
				})
				.toBuffer();

			return {
				input,
				gravity: "northwest",
				left: x * bannerWidth,
				top: y * bannerHeight,
			};
		}),
	);

	sharp({
		create: {
			width: bannerWidth * sheetWidth,
			height: bannerHeight * sheetHeight,
			channels: 3,
			background: { r: 0, g: 0, b: 0 },
		},
	})
		.composite(bannerBuffers)
		.jpeg({
			quality: 90,
		})
		.toFile(path.resolve(__dirname, "src/assets/steam-spritesheet.jpg"));

	fs.writeFileSync(
		path.resolve(__dirname, "src/app/cards/games/steam-ids.ts"),
		"export const steamIds = " + JSON.stringify(steamIds),
	);
})();
