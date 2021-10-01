export function getBackgroundPositionsForSpritesheet(
	width: number,
	height: number,
) {
	let positions: string[] = [];
	for (let i = 0; i < width * height; i++) {
		const x = i % width;
		const y = Math.floor(i / width);
		positions.push(
			[
				(x / (width - 1)) * 100 + "%",
				(y / (height - 1)) * 100 + "%",
			].join(" "),
		);
	}
	return positions;
}
