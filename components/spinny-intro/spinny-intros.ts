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

export interface ISpinnyIntro {
	date: [number, number, number];
	desktop: string;
	mobile: string;
	// added: string[];
	// removed: string[];
}

export interface ISpinnyIntroWithIndex extends ISpinnyIntro {
	index: number;
}

// TODO: dynamic import??

export const SpinnyIntros: ISpinnyIntro[] = [
	{
		date: [2024, 8, 4],
		desktop: video_2024_08_04_desktop,
		mobile: video_2024_08_04_mobile,
	},
	{
		date: [2024, 7, 19],
		desktop: video_2024_07_19_desktop,
		mobile: video_2024_07_19_mobile,
	},
	{
		date: [2024, 7, 9],
		desktop: video_2024_07_09_desktop,
		mobile: video_2024_07_09_mobile,
	},
	{
		date: [2024, 6, 12],
		desktop: video_2024_06_12_desktop,
		mobile: video_2024_06_12_mobile,
	},
	{
		date: [2024, 5, 14],
		desktop: video_2024_05_14_desktop,
		mobile: video_2024_05_14_mobile,
	},
	{
		date: [2024, 5, 11],
		desktop: video_2024_05_11_desktop,
		mobile: video_2024_05_11_mobile,
	},
	{
		date: [2024, 4, 20],
		desktop: video_2024_04_20_desktop,
		mobile: video_2024_04_20_mobile,
	},
	{
		date: [2024, 3, 31],
		desktop: video_2024_03_31_desktop,
		mobile: video_2024_03_31_mobile,
	},
	{
		date: [2024, 3, 30],
		desktop: video_2024_03_30_desktop,
		mobile: video_2024_03_30_mobile,
	},
	{
		date: [2024, 1, 31],
		desktop: video_2024_01_31_desktop,
		mobile: video_2024_01_31_mobile,
	},
	{
		date: [2024, 1, 16],
		desktop: video_2024_01_16_desktop,
		mobile: video_2024_01_16_mobile,
	},
	{
		date: [2023, 10, 23],
		desktop: video_2023_10_23_desktop,
		mobile: video_2023_10_23_mobile,
	},
	{
		date: [2023, 10, 10],
		desktop: video_2023_10_10,
		mobile: video_2023_10_10,
	},
	{
		date: [2023, 9, 21],
		desktop: video_2023_09_21,
		mobile: video_2023_09_21,
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
