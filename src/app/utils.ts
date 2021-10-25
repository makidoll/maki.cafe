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

export function getImage(url: string) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const img = document.createElement("img");
		img.addEventListener("load", () => {
			resolve(img);
		});
		img.addEventListener("error", error => {
			reject(error);
		});
		img.src = url;
	});
}

export function shuffleArray(array: any[]) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
