// import { Nunito } from "next/font/google";
import localFont from "next/font/local";

// const nunito = Nunito({
// 	subsets: ["latin"],
// 	weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
// });

// const jetBrainsMono = JetBrains_Mono({
// 	subsets: ["latin"],
// 	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
// });

const cascadiaMono = localFont({
	// needs to be string literal
	preload: false,
	src: [
		{
			path: "./cascadia-mono/CascadiaMono-ExtraLight.woff2",
			style: "normal",
			weight: "200",
		},
		{
			path: "./cascadia-mono/CascadiaMono-ExtraLightItalic.woff2",
			style: "italic",
			weight: "200",
		},
		{
			path: "./cascadia-mono/CascadiaMono-Light.woff2",
			style: "normal",
			weight: "300",
		},
		{
			path: "./cascadia-mono/CascadiaMono-LightItalic.woff2",
			style: "italic",
			weight: "300",
		},
		{
			path: "./cascadia-mono/CascadiaMono-SemiLight.woff2",
			style: "normal",
			weight: "350",
		},
		{
			path: "./cascadia-mono/CascadiaMono-SemiLightItalic.woff2",
			style: "italic",
			weight: "350",
		},
		{
			path: "./cascadia-mono/CascadiaMono-Regular.woff2",
			style: "normal",
			weight: "400",
		},
		{
			path: "./cascadia-mono/CascadiaMono-Italic.woff2",
			style: "italic",
			weight: "400",
		},
		{
			path: "./cascadia-mono/CascadiaMono-SemiBold.woff2",
			style: "normal",
			weight: "600",
		},
		{
			path: "./cascadia-mono/CascadiaMono-SemiBoldItalic.woff2",
			style: "italic",
			weight: "600",
		},
		{
			path: "./cascadia-mono/CascadiaMono-Bold.woff2",
			style: "normal",
			weight: "700",
		},
		{
			path: "./cascadia-mono/CascadiaMono-BoldItalic.woff2",
			style: "italic",
			weight: "700",
		},
	],
});

const kgAlwaysAGoodTime = localFont({
	preload: false,
	src: "./KGAlwaysAGoodTime.woff2",
});

// const minecraft = localFont({
// 	src: "./Minecraft.woff2",
// });

const snPro = localFont({
	// needs to be string literal
	preload: false,
	src: [
		{
			path: "./sn-pro/SNPro-Thin.woff2",
			style: "normal",
			weight: "200",
		},
		{
			path: "./sn-pro/SNPro-ThinItalic.woff2",
			style: "italic",
			weight: "200",
		},
		{
			path: "./sn-pro/SNPro-Light.woff2",
			style: "normal",
			weight: "300",
		},
		{
			path: "./sn-pro/SNPro-LightItalic.woff2",
			style: "italic",
			weight: "300",
		},
		{
			path: "./sn-pro/SNPro-Book.woff2",
			style: "normal",
			weight: "350",
		},
		{
			path: "./sn-pro/SNPro-BookItalic.woff2",
			style: "italic",
			weight: "350",
		},
		{
			path: "./sn-pro/SNPro-Regular.woff2",
			style: "normal",
			weight: "400",
		},
		{
			path: "./sn-pro/SNPro-RegularItalic.woff2",
			style: "italic",
			weight: "400",
		},
		{
			path: "./sn-pro/SNPro-Medium.woff2",
			style: "normal",
			weight: "500",
		},
		{
			path: "./sn-pro/SNPro-MediumItalic.woff2",
			style: "italic",
			weight: "500",
		},
		{
			path: "./sn-pro/SNPro-Semibold.woff2",
			style: "normal",
			weight: "600",
		},
		{
			path: "./sn-pro/SNPro-SemiboldItalic.woff2",
			style: "italic",
			weight: "600",
		},
		{
			path: "./sn-pro/SNPro-Bold.woff2",
			style: "normal",
			weight: "700",
		},
		{
			path: "./sn-pro/SNPro-BoldItalic.woff2",
			style: "italic",
			weight: "700",
		},
		{
			path: "./sn-pro/SNPro-Heavy.woff2",
			style: "normal",
			weight: "800",
		},
		{
			path: "./sn-pro/SNPro-HeavyItalic.woff2",
			style: "italic",
			weight: "800",
		},
		{
			path: "./sn-pro/SNPro-Black.woff2",
			style: "normal",
			weight: "900",
		},
		{
			path: "./sn-pro/SNPro-BlackItalic.woff2",
			style: "italic",
			weight: "900",
		},
	],
});

export { cascadiaMono, kgAlwaysAGoodTime, snPro };
