import { JetBrains_Mono, Nunito } from "next/font/google";
import localFont from "next/font/local";

const nunito = Nunito({
	subsets: ["latin"],
	weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
});

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const kgAlwaysAGoodTime = localFont({
	src: "./KGAlwaysAGoodTime.woff2",
});

const minecraft = localFont({
	src: "./Minecraft.woff2",
});

export { nunito, jetBrainsMono, kgAlwaysAGoodTime, minecraft };
