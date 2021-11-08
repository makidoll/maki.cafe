import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { makeSpriteSheet } from "./make-spritesheet-lib.mjs";

const __dirname = path.dirname(
	import.meta.url.replace(
		"file://" + (os.platform() == "win32" ? "/" : ""),
		"",
	),
);

const scale = 2;
const skebWidth = 80 * scale;
const skebHeight = 96 * scale;

const sheetWidth = 4;
const sheetHeight = 3;

const possibleFilesDirs = [
	"C:\\Files", // windows
	path.resolve(os.homedir(), "Files"), // mac os
	path.resolve(os.homedir(), "files"), // linux
];

(async () => {
	let files = null;
	for (const possibleFilesDir of possibleFilesDirs) {
		if (fs.existsSync(possibleFilesDir)) {
			files = possibleFilesDir;
			break;
		}
	}
	if (files == null) throw new Error("Files not found");

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
		path.resolve(__dirname, "../src/assets/skeb-spritesheet.jpg"),
	);
})();
