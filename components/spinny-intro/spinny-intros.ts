import video_2023_09_21 from "./videos/2023-09-21.webm";
import video_2023_10_10 from "./videos/2023-10-10.webm";
import video_2023_10_23_desktop from "./videos/2023-10-23-desktop.webm";
import video_2023_10_23_mobile from "./videos/2023-10-23-mobile.webm";
import video_2024_01_16_desktop from "./videos/2024-01-16-desktop.webm";
import video_2024_01_16_mobile from "./videos/2024-01-16-mobile.webm";
import video_2024_01_31_desktop from "./videos/2024-01-31-desktop.webm";
import video_2024_01_31_mobile from "./videos/2024-01-31-mobile.webm";
import video_2024_03_30_desktop from "./videos/2024-03-30-desktop.webm";
import video_2024_03_30_mobile from "./videos/2024-03-30-mobile.webm";
import video_2024_03_31_desktop from "./videos/2024-03-31-desktop.webm";
import video_2024_03_31_mobile from "./videos/2024-03-31-mobile.webm";
import video_2024_04_20_desktop from "./videos/2024-04-20-desktop.webm";
import video_2024_04_20_mobile from "./videos/2024-04-20-mobile.webm";
import video_2024_05_11_desktop from "./videos/2024-05-11-desktop.webm";
import video_2024_05_11_mobile from "./videos/2024-05-11-mobile.webm";
import video_2024_05_14_desktop from "./videos/2024-05-14-desktop.webm";
import video_2024_05_14_mobile from "./videos/2024-05-14-mobile.webm";
import video_2024_06_12_desktop from "./videos/2024-06-12-desktop.webm";
import video_2024_06_12_mobile from "./videos/2024-06-12-mobile.webm";
import video_2024_07_09_desktop from "./videos/2024-07-09-desktop.webm";
import video_2024_07_09_mobile from "./videos/2024-07-09-mobile.webm";
import video_2024_07_19_desktop from "./videos/2024-07-19-desktop.webm";
import video_2024_07_19_mobile from "./videos/2024-07-19-mobile.webm";
import video_2024_08_04_desktop from "./videos/2024-08-04-desktop.webm";
import video_2024_08_04_mobile from "./videos/2024-08-04-mobile.webm";
import video_2024_08_31_desktop from "./videos/2024-08-31-desktop.webm";
import video_2024_08_31_mobile from "./videos/2024-08-31-mobile.webm";
import video_2024_10_24_desktop from "./videos/2024-10-24-desktop.webm";
import video_2024_10_24_mobile from "./videos/2024-10-24-mobile.webm";
import video_2025_01_12_desktop from "./videos/2025-01-12-desktop.webm";
import video_2025_01_12_mobile from "./videos/2025-01-12-mobile.webm";

export interface ISpinnyIntro {
	date: [number, number, number];
	desktop: string;
	mobile: string;
	changes: string[];
	// removed: string[];
}

export interface ISpinnyIntroWithIndex extends ISpinnyIntro {
	index: number;
}

// TODO: dynamic import??

export const SpinnyIntros: ISpinnyIntro[] = [
	{
		date: [2025, 1, 12],
		desktop: video_2025_01_12_desktop,
		mobile: video_2025_01_12_mobile,
		changes: [
			"add huel",
			"add mercy staff",
			"add rubiks cube",
			"remove fresnel on kirby",
			"move blahaj closer to me",
			"improve pony sticker visibility",
		],
	},
	{
		date: [2024, 10, 24],
		desktop: video_2024_10_24_desktop,
		mobile: video_2024_10_24_mobile,
		changes: [
			"add hoof frogs",
			"update eyes texture",
			"add cheerilee sticker",
		],
	},
	{
		date: [2024, 8, 31],
		desktop: video_2024_08_31_desktop,
		mobile: video_2024_08_31_mobile,
		changes: ["update mane to anonfilly", "remove rounded hooves"],
	},
	{
		date: [2024, 8, 4],
		desktop: video_2024_08_04_desktop,
		mobile: video_2024_08_04_mobile,
		changes: [
			"slightly increase hoof shinyness",
			"add kirby figure",
			"resize bastion figure",
			"remove sona sticker",
			"add apple bloom and /mlp/ stickers",
		],
	},
	{
		date: [2024, 7, 19],
		desktop: video_2024_07_19_desktop,
		mobile: video_2024_07_19_mobile,
		changes: [
			"add anonfilly sticker",
			"replace vscode sticker with vscodium",
		],
	},
	{
		date: [2024, 7, 9],
		desktop: video_2024_07_09_desktop,
		mobile: video_2024_07_09_mobile,
		changes: [
			"increase neck length",
			"remove rarity, palutena, overwatch and unity stickers",
			"add minuette and nurse redheart stickers",
			"add blahaj and linux stickers",
		],
	},
	{
		date: [2024, 6, 12],
		desktop: video_2024_06_12_desktop,
		mobile: video_2024_06_12_mobile,
		changes: [
			"update mane to be tied up",
			"remove collar",
			"add seedling to cutie mark",
		],
	},
	{
		date: [2024, 5, 14],
		desktop: video_2024_05_14_desktop,
		mobile: video_2024_05_14_mobile,
		changes: ["...i dont know, maybe just some video encoding"],
	},
	{
		date: [2024, 5, 11],
		desktop: video_2024_05_11_desktop,
		mobile: video_2024_05_11_mobile,
		changes: [
			"use rounded hooves",
			"add twilight sparkle sticker",
			"update screen texture",
		],
	},
	{
		date: [2024, 4, 20],
		desktop: video_2024_04_20_desktop,
		mobile: video_2024_04_20_mobile,
		changes: [
			"add more color to gradient on body",
			"stretch out hind legs outward",
			"rearrange stickers a lot",
			"add marble pie, lain and sona stickers",
			"remove blahaj, fox, shrimp, doom/isabelle stickers",
		],
	},
	{
		date: [2024, 3, 31],
		desktop: video_2024_03_31_desktop,
		mobile: video_2024_03_31_mobile,
		changes: ["update mane gradients so its linear"],
	},
	{
		date: [2024, 3, 30],
		desktop: video_2024_03_30_desktop,
		mobile: video_2024_03_30_mobile,
		changes: ["become a pony!", "add fluttershy sticker"],
	},
	{
		date: [2024, 1, 31],
		desktop: video_2024_01_31_desktop,
		mobile: video_2024_01_31_mobile,
		changes: [
			"add metroid floating above screen",
			"remove metroid sticker",
			"update display materials to be shinier",
		],
	},
	{
		date: [2024, 1, 16],
		desktop: video_2024_01_16_desktop,
		mobile: video_2024_01_16_mobile,
		changes: [
			"take off drone mask for mercy's head",
			"enlarge butt slightly",
			"broken kneecaps i couldn't fix",
			"add more lights to the fox lamp",
			"update samus sticker",
			"reorganize stickers",
			"remove react, rider, github, hackernews stickers",
			"add miku, palutena, metroid, deno stickers",
		],
	},
	{
		date: [2023, 10, 23],
		desktop: video_2023_10_23_desktop,
		mobile: video_2023_10_23_mobile,
		changes: ["add big blahaj", "shrink fez figure and move"],
	},
	{
		date: [2023, 10, 10],
		desktop: video_2023_10_10,
		mobile: video_2023_10_10,
		changes: [
			"update skybox to night time city",
			"add minecraft fox lamp",
			"resize plushies a little",
		],
	},
	{
		date: [2023, 9, 21],
		desktop: video_2023_09_21,
		mobile: video_2023_09_21,
		changes: [
			"start using webm for spinny intro",
			"there are more, but those used three.js",
		],
	},
];

export const SpinnyIntrosSortedByYear = SpinnyIntros.map((intro, i) => {
	let introWithIndex = intro as ISpinnyIntroWithIndex;
	introWithIndex.index = i;
	return introWithIndex;
}).reduce<
	{
		year: number;
		intros: ISpinnyIntroWithIndex[];
	}[]
>((array, intro) => {
	const year = intro.date[0];
	const found = array.find(v => v.year == year);

	if (found) {
		found.intros.push(intro);
	} else {
		array.push({
			year,
			intros: [intro],
		});
	}

	return array;
}, []);
