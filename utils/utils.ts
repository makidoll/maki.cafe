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

export const clamp = (min: number, max: number, n: number) =>
	Math.min(Math.max(n, min), max);

export const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

export const lerp = (a: number, b: number, alpha: number) =>
	a + alpha * (b - a);

export const invLerp = (a: number, b: number, alpha: number) =>
	clamp(0, 1, (alpha - a) / (b - a));

export const glslMod = (a: number, n: number) => (a + n) % n;

export function hexColorToRgb(hexColor: string) {
	let matches = hexColor
		.trim()
		.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);

	if (matches != null) {
		return [
			parseInt(matches[1], 16),
			parseInt(matches[2], 16),
			parseInt(matches[3], 16),
		];
	}

	matches = hexColor
		.trim()
		.match(/^#?([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{1})$/i);

	if (matches != null) {
		return [
			parseInt(matches[1] + matches[1], 16),
			parseInt(matches[2] + matches[2], 16),
			parseInt(matches[3] + matches[3], 16),
		];
	}

	return null;
}

export function colorMix(hexA: string, hexB: string, amount: number) {
	const colors = [hexA, hexB].map(hexCode => hexColorToRgb(hexCode));

	if (colors[0] == null) return;
	if (colors[1] == null) return;

	const clamped = clamp(0, 1, amount);

	const r = Math.floor(lerp(colors[0][0], colors[1][0], clamped));
	const g = Math.floor(lerp(colors[0][1], colors[1][1], clamped));
	const b = Math.floor(lerp(colors[0][2], colors[1][2], clamped));

	return (
		"#" +
		r.toString(16).padStart(2, "0") +
		g.toString(16).padStart(2, "0") +
		b.toString(16).padStart(2, "0")
	);
}

export function capitalize(text: string) {
	return text[0].toUpperCase() + text.substring(1).toLowerCase();
}

export function sleep(ms: number) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(null);
		}, ms);
	});
}

export function plural(n: number, single: string, plural: string = null) {
	if (plural == null) plural = single + "s";
	if (n == 1 || n == -1) return n + " " + single;
	else return n + " " + plural;
}
