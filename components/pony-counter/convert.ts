import sharp from "sharp";
import * as path from "path";
import * as fs from "fs/promises";

(async () => {
	const output = path.resolve(__dirname, "assets");
	await fs.mkdir(output, { recursive: true });

	const input = sharp(path.resolve(__dirname, "no-watermark.png"));
	const { width, height } = await input.metadata();

	const ponyW = Math.floor(width / 5);
	const ponyH = Math.floor(height / 2);

	const wAdjustments = {
		7: -1,
	};

	const xAdjustments = {
		2: -7,
		3: -12,
		4: -12,
		5: 6,
		6: 6,
		7: 1,
	};

	for (let i = 0; i < 10; i++) {
		const x = i % 5;
		const y = Math.floor(i / 5);

		const left = x * ponyW + (xAdjustments[i] ?? 0);
		const top = y * ponyH;

		const width = ponyW + (wAdjustments[i] ?? 0);
		const height = ponyH;

		let image = input.clone().extract({
			left,
			top,
			width,
			height,
		});

		// https://github.com/lovell/sharp/issues/2103
		image = sharp(await image.png().toBuffer());

		await image
			.trim()
			.png()
			.toFile(path.resolve(output, i + ".png"));
	}
})();

// input.ex;
