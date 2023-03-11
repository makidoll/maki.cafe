import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
	subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
});

const kgAlwaysAGoodTime = localFont({
	src: "./KGAlwaysAGoodTime.woff2",
});

const minecraft = localFont({
	src: "./Minecraft.woff2",
});

export { inter, jetBrainsMono, kgAlwaysAGoodTime, minecraft };
