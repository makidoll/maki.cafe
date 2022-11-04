import sharp from "sharp";

export async function makeSpriteSheet(
	imageWidth,
	imageHeight,
	sheetWidth,
	sheetHeight,
	imagesInputs,
	outputPath,
) {
	if (imagesInputs.length > sheetWidth * sheetHeight) {
		throw new Error(
			"Too many image inputs. Only " +
				sheetWidth * sheetHeight +
				" spaces",
		);
	}

	let positionStrings = [];

	const images = await Promise.all(
		imagesInputs.map(async (imageInput, i) => {
			const x = i % sheetWidth;
			const y = Math.floor(i / sheetWidth);

			positionStrings.push(
				[
					(x / (sheetWidth - 1)) * 100 + "%",
					(y / (sheetHeight - 1)) * 100 + "%",
				].join(" "),
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
				left: x * imageWidth,
				top: y * imageHeight,
			};
		}),
	);

	await sharp({
		create: {
			width: imageWidth * sheetWidth,
			height: imageHeight * sheetHeight,
			channels: 3,
			background: { r: 0, g: 0, b: 0 },
		},
	})
		.composite(images)
		.jpeg({
			quality: 90,
		})
		.toFile(outputPath);

	return positionStrings;
}
