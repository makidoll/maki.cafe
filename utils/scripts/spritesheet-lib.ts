import sharp from "sharp";

const cssPercentageNumbers = (numbers: number[]) =>
	numbers.map(p => (p * 100).toFixed(2).replace(/\.00/, "") + "%").join(" ");

export async function makeSpriteSheet(
	imageWidth: number,
	imageHeight: number,
	imagePadding: number,
	sheetWidth: number,
	sheetHeight: number,
	imagesInputs: (Buffer | string)[],
	outputPath: string,
) {
	if (imagesInputs.length > sheetWidth * sheetHeight) {
		throw new Error(
			"Too many image inputs. Only " +
				sheetWidth * sheetHeight +
				" spaces",
		);
	}

	const spriteSheetWidth =
		imageWidth * sheetWidth + imagePadding * (sheetWidth - 1);
	const spriteSheetHeight =
		imageHeight * sheetHeight + imagePadding * (sheetHeight - 1);

	let cssSize = cssPercentageNumbers([
		spriteSheetWidth / imageWidth,
		spriteSheetHeight / imageHeight,
	]);

	let cssPositions = [];

	const images = await Promise.all(
		imagesInputs.map(async (imageInput, i) => {
			const x = i % sheetWidth;
			const y = Math.floor(i / sheetWidth);

			cssPositions.push(
				cssPercentageNumbers([
					x / (sheetWidth - 1),
					y / (sheetHeight - 1),
				]),
			);

			const input = await sharp(imageInput)
				.resize(imageWidth, imageHeight, {
					fit: "cover",
					kernel: "lanczos3",
				})
				.toBuffer();

			return {
				input,
				gravity: "northwest",
				left: x * imageWidth + x * imagePadding,
				top: y * imageHeight + y * imagePadding,
			};
		}),
	);

	await sharp({
		create: {
			width: spriteSheetWidth,
			height: spriteSheetHeight,
			channels: 3,
			background: { r: 0, g: 0, b: 0 },
		},
	})
		.composite(images)
		.jpeg({
			quality: 90,
		})
		.toFile(outputPath);

	return { cssSize, cssPositions };
}
