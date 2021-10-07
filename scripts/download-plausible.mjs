import fetch from "node-fetch";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

const __dirname = path.dirname(
	import.meta.url.replace(
		"file://" + (os.platform() == "win32" ? "/" : ""),
		"",
	),
);

const filename = "66c2e6a0f3149850fd26.js"; // half of sha1 "plausible.js"
const url = "https://plausible.tivolicloud.com/js/plausible.js";

(async () => {
	const res = await fetch(url);
	if (!res.ok) {
		console.error("Failed to fetch Plausible js file");
		process.exit(1);
	}

	let js = await res.text();
	js = js.replace(/\[src\*="'\+[a-z]\+'"\]/, `[src*="${"/" + filename}"]`);

	const pathToJs = path.resolve(__dirname, "../src/" + filename);
	fs.writeFileSync(pathToJs, js);

	console.log("Successfully written " + pathToJs);
})();
