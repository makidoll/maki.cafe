import * as fs from "fs";
import * as path from "path";
import { makeSpriteSheet } from "./make-spritesheet-lib.mjs";

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

	const skebInputs = fs
		.readdirSync(skebExport)
		.filter(f => f.endsWith(".png"))
		.reverse()
		.slice(0, sheetWidth * sheetHeight)
		.map(filename => path.resolve(skebExport, filename));

	await makeSpriteSheet(
		skebWidth,
		skebHeight,
		sheetWidth,
		sheetHeight,
		skebInputs,
		path.resolve("src/assets/skeb-spritesheet.jpg"),
	);
})();
