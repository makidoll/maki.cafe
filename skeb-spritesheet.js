const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const scale = 2;
const skebWidth = 80 * scale;
const skebHeight = 96 * scale;

const sheetWidth = 4;
const sheetHeight = 3;

(async () => {
	let files = null;
	if (fs.existsSync("C:\\Files")) files = "C:\\Files";
	else if (fs.existsSync("~/Files")) files = "~/Files";
	else if (fs.existsSync("~/files")) files = "~/files";
	const skebExport = path.resolve(files, "Projects/Skeb/export");

	const skebs = fs
		.readdirSync(skebExport)
		.filter(f => f.endsWith(".png"))
		.reverse()
		.slice(0, sheetWidth * sheetHeight);

	const skebBuffers = await Promise.all(
		skebs.map(async (filename, i) => {
			const x = i % sheetWidth;
			const y = Math.floor(i / sheetWidth);

			const input = await sharp(path.resolve(skebExport, filename))
				.resize(skebWidth, skebHeight, {
					fit: "cover",
					kernel: "lanczos3",
				})
				.toBuffer();

			return {
				input,
				gravity: "northwest",
				left: x * skebWidth,
				top: y * skebHeight,
			};
		}),
	);

	sharp({
		create: {
			width: skebWidth * sheetWidth,
			height: skebHeight * sheetHeight,
			channels: 3,
			background: { r: 0, g: 0, b: 0 },
		},
	})
		.composite(skebBuffers)
		.jpeg({
			quality: 90,
		})
		.toFile(path.resolve(__dirname, "src/assets/skeb-spritesheet.jpg"));
})();
