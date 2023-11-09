const fs = require("fs");

const frames = JSON.parse(fs.readFileSync("frames.json", "utf8"));

for (let i = 0; i < frames.length; i++) {
	const png = Buffer.from(frames[i].split(",")[1], "base64");
	fs.writeFileSync("./frames/" + i + ".png", png);
}
